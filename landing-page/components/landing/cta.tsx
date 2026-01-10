"use client";

import { useMagnetic } from "@/hooks/use-magnetic";
import { Button } from "@/components/ui/button";

export function CTA() {
    const btnRef = useMagnetic();

    return (
        <section className="py-32 border-t border-border/40 bg-muted/10">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                    Start Building with MAF
                </h2>
                <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                    Use MAF as your foundation and grow without rewriting everything later.
                </p>
                <div ref={btnRef as any} className="inline-block">
                    <Button size="lg" className="rounded-full px-10 h-12 text-base">
                        Get Started
                    </Button>
                </div>
            </div>
        </section>
    );
}
