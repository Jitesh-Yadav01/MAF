"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
    {
        id: 1,
        title: "Modular Architecture",
        description: "Build systems using independent, reusable modules that scale effortlessly.",
        badge: "Scalability",
    },
    {
        id: 2,
        title: "Automation First",
        description: "Automate workflows, deployments, and integrations by design.",
        badge: "Efficiency",
    },
    {
        id: 3,
        title: "Developer Experience",
        description: "Clean APIs, predictable patterns, and tools developers actually enjoy.",
        badge: "Productivity",
    },
];

export function CoreCapabilities() {
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

            if (isDesktop) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=400%",
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                const elements = slidesRef.current;

                // Matches WhyMaf strict sequence to ensure consistency
                tl.to(elements[0], { opacity: 0, x: -50, duration: 1, ease: "power2.inOut" })
                    .to({}, { duration: 0.5 })
                    .fromTo(elements[1], { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" })
                    .to({}, { duration: 0.5 })
                    .to(elements[1], { opacity: 0, x: -50, duration: 1, ease: "power2.inOut" })
                    .to({}, { duration: 0.5 })
                    .fromTo(elements[2], { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" });

            } else {
                slidesRef.current.forEach((slide) => {
                    gsap.from(slide, {
                        scrollTrigger: {
                            trigger: slide,
                            start: "top 80%",
                        },
                        opacity: 0,
                        x: -20,
                        duration: 0.8,
                    });
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-auto lg:h-screen w-full bg-background border-t border-border/10">
            <div className="container mx-auto h-full px-6 py-24 lg:py-0 flex flex-col lg:block items-center justify-center">
                {capabilities.map((cap, index) => (
                    <div
                        key={cap.id}
                        ref={(el) => { slidesRef.current[index] = el; }}
                        className={cn(
                            "w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16",
                            "lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2",
                            index === 0 ? "lg:opacity-100" : "lg:opacity-0",
                            "mb-24 lg:mb-0 last:mb-0"
                        )}
                    >
                        {/* Visual Part (Left/Top) */}
                        <div className="flex-1 w-full flex justify-center md:justify-end">
                            <div className="h-40 w-40 md:h-64 md:w-64 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                                <span className="text-4xl font-mono font-bold text-primary/40">0{cap.id}</span>
                            </div>
                        </div>

                        {/* Text Part (Right/Bottom) */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <Badge variant="secondary" className="mb-4">{cap.badge}</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                                {cap.title}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {cap.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
