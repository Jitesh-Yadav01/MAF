import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { WhyMaf } from "@/components/landing/why-maf";
import { CoreCapabilities } from "@/components/landing/core-capabilities";
import { CodePreview } from "@/components/landing/code-preview";
import { Security } from "@/components/landing/security";

import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
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
