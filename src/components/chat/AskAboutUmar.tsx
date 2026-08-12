"use client";

import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SUGGESTED_QUESTIONS } from "@/lib/umar-knowledge";

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  content: string;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const LINK_PATTERN =
  /(https?:\/\/[^\s<]+[^\s<.,;:!?"')\]])|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

function MessageContent({
  content,
  accent,
}: {
  content: string;
  accent?: boolean;
}) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_PATTERN.source, "g");

  while ((match = re.exec(content)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(content.slice(lastIndex, match.index));
    }

    const url = match[1];
    const email = match[2];

    if (url) {
      nodes.push(
        <a
          key={`${match.index}-url`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            accent
              ? "underline underline-offset-2 break-all"
              : "text-accent underline underline-offset-2 break-all hover:opacity-90"
          }
        >
          {url}
        </a>
      );
    } else if (email) {
      nodes.push(
        <a
          key={`${match.index}-email`}
          href={`mailto:${email}`}
          className={
            accent
              ? "underline underline-offset-2 break-all"
              : "text-accent underline underline-offset-2 break-all hover:opacity-90"
          }
        >
          {email}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    nodes.push(content.slice(lastIndex));
  }

  return <>{nodes.length ? nodes : content}</>;
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error || "Request failed.";
  } catch {
    return "Request failed.";
  }
}

export default function AskAboutUmar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi — ask me anything about Umar's background, stack, projects, or availability. I'll stick to verified details from his portfolio.",
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, streaming, open]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 180);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading || streaming) return;

    setError(null);
    setInput("");

    const userMsg: Message = { id: uid(), role: "user", content: trimmed };
    const assistantId = uid();

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const history = [...messages, userMsg]
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        throw new Error(await readErrorMessage(res));
      }

      if (!res.body) {
        throw new Error("No response stream available.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assembled = "";
      let started = false;

      const ensureAssistantBubble = () => {
        if (started) return;
        started = true;
        setLoading(false);
        setStreaming(true);
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "" },
        ]);
      };

      const appendChunk = (chunk: string) => {
        assembled += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assembled } : m
          )
        );
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const line = part
            .split("\n")
            .map((l) => l.trim())
            .find((l) => l.startsWith("data:"));
          if (!line) continue;

          const payload = line.slice(5).trim();
          if (!payload) continue;

          let data: { content?: string; done?: boolean; error?: string };
          try {
            data = JSON.parse(payload) as {
              content?: string;
              done?: boolean;
              error?: string;
            };
          } catch {
            continue;
          }

          if (data.error) {
            throw new Error(data.error);
          }

          if (data.content) {
            ensureAssistantBubble();
            appendChunk(data.content);
          }
        }
      }

      if (!started) {
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content:
              "I don't have a clear answer for that. Please reach out via the contact form.",
          },
        ]);
      } else if (!assembled.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "I don't have a clear answer for that. Please reach out via the contact form.",
                }
              : m
          )
        );
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(msg);
      setMessages((prev) => {
        const withoutEmptyAssistant = prev.filter(
          (m) => !(m.role === "assistant" && m.content === "" && m.id !== "welcome")
        );
        return [
          ...withoutEmptyAssistant,
          {
            id: uid(),
            role: "assistant",
            content:
              "I couldn't reach the assistant just now. Please try again shortly, or use the contact form on this site.",
          },
        ];
      });
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const busy = loading || streaming;
  const showSuggestions = messages.length <= 1 && !busy && !error;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex h-[min(70vh,520px)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-border/80 bg-[#0c0c0e]/95 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:h-[min(72vh,540px)]"
            role="dialog"
            aria-label="Ask about Umar"
          >
            <header className="flex items-center justify-between border-b border-border/70 px-4 py-3.5">
              <div>
                <p className="text-[13px] font-semibold tracking-tight text-foreground">
                  Ask about Umar
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  Recruiter Q&amp;A · grounded answers only
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 text-muted transition-colors hover:border-accent/40 hover:text-accent"
                aria-label="Close chat"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-accent text-background"
                        : "border border-border/70 bg-white/[0.03] text-foreground/90"
                    }`}
                  >
                    <MessageContent
                      content={m.content}
                      accent={m.role === "user"}
                    />
                    {streaming &&
                      m.role === "assistant" &&
                      m.id === messages[messages.length - 1]?.id && (
                        <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-accent align-middle" />
                      )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-border/70 bg-white/[0.03] px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="rounded-full border border-border/80 bg-transparent px-3 py-1.5 text-left text-[11px] font-medium text-muted transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-t border-border/70 p-3"
            >
              {error && (
                <p className="mb-2 px-1 text-[11px] text-rose-300/90">{error}</p>
              )}
              <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/60 px-2.5 py-1.5 focus-within:border-accent/40">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  maxLength={800}
                  disabled={busy}
                  className="min-w-0 flex-1 bg-transparent px-1.5 py-2 text-[13px] text-foreground outline-none placeholder:text-dark-muted disabled:opacity-60"
                  aria-label="Your question"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-background transition-opacity disabled:opacity-40"
                  aria-label="Send"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="pointer-events-auto flex h-14 items-center gap-2.5 rounded-full border border-accent/30 bg-card/95 px-4 text-[13px] font-semibold text-foreground shadow-[0_0_40px_rgba(94,234,212,0.18)] backdrop-blur-xl transition-colors hover:border-accent/60"
        aria-expanded={open}
        aria-label={open ? "Close Ask about Umar" : "Open Ask about Umar"}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-background">
          {open ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="pr-1">{open ? "Close" : "Ask about Umar"}</span>
      </motion.button>
    </div>
  );
}
