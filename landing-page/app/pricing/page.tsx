import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function PricingPage() {
    return (
        <main className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
            <Navbar />
            <div className="pt-24">
                <Pricing />
            </div>
            <CTA />
            <Footer />
        </main>
    );
}
