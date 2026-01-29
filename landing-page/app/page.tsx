import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/home/hero";
import { WhyMaf } from "@/components/home/why-maf";
import { CoreCapabilities } from "@/components/home/core-capabilities";
import { CodePreview } from "@/components/home/code-preview";
import { Security } from "@/components/home/security";

import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/footer/footer";
import { Preloader } from "@/components/ui/preloader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col selection:bg-primary/20">
      <Preloader />
      <Navbar />
      <Hero />

      <div className="relative z-10 bg-background">
        <CodePreview />
        
        <CoreCapabilities />
        {/* <WhyMaf /> */}
        <Security />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
