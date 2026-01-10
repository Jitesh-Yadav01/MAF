import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { WhyMaf } from "@/components/landing/why-maf";
import { CoreCapabilities } from "@/components/landing/core-capabilities";
import { CodePreview } from "@/components/landing/code-preview";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { Preloader } from "@/components/ui/preloader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Preloader />
      <Navbar />
      <Hero />
      <WhyMaf />
      <CoreCapabilities />
      <CodePreview />
      <CTA />
      <Footer />
    </main>
  );
}
