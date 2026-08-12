import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/lib/umar-knowledge";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Body = {
  message?: string;
  history?: ChatMessage[];
};

const MODEL = "llama-3.3-70b-versatile";
// Tradeoff: 70B = stronger grounding/accuracy for recruiters.
// Swap to "llama-3.1-8b-instant" for lower latency/cost if needed.

const MAX_MESSAGE_CHARS = 800;
const MAX_HISTORY = 8;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(ip);

  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSec),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Chat is temporarily unavailable. Please use the contact form instead.",
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = body.message?.trim() ?? "";
  if (!message) {
    return NextResponse.json(
      { error: "Please enter a question." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: "Question is too long. Please keep it under 800 characters." },
      { status: 400 }
    );
  }

  const history = (body.history ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));

  try {
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      max_tokens: 320,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (!text) continue;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`)
            );
          }
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`)
          );
        } catch (err) {
          console.error("[api/chat] stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                error:
                  "Something went wrong answering that. Please try again or use the contact form.",
              })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-RateLimit-Remaining": String(limit.remaining),
      },
    });
  } catch (err) {
    console.error("[api/chat] Groq error:", err);
    return NextResponse.json(
      {
        error:
          "Something went wrong answering that. Please try again or use the contact form.",
      },
      { status: 502 }
    );
  }
}
