import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AskAboutUmar from "@/components/chat/AskAboutUmar";

/**
 * Page composition is data-driven via src/content/*.
 * Add projects / expertise / stack entries — sections scale automatically.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Services />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <AskAboutUmar />
    </SmoothScroll>
  );
}
