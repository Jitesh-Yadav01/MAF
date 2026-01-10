"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        id: 1,
        title: "1. Request Interception",
        subtitle: "Every request is paused before execution. We analyze headers, payload, and fingerprint against session history in Redis.",
        badge: "Ingestion",
    },
    {
        id: 2,
        title: "2. Limit & Risk Scoring",
        subtitle: "Deterministic rules evaluate velocity and entropy. AI agents flag high-risk anomalies for deeper inspection.",
        badge: "Analysis",
    },
    {
        id: 3,
        title: "3. Enforcement & Audit",
        subtitle: "Malicious actors are blocked instantly. All decisions are logged to MongoDB with optional blockchain anchoring.",
        badge: "Decision",
    },
];

export function WhyMaf() {
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
                        end: "+=400%", // Long scroll for reading
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                const elements = slidesRef.current;

                tl.to(elements[0], { opacity: 0, y: -40, duration: 1, ease: "power2.inOut" }) // Exit 1
                    .to({}, { duration: 0.5 }) // Gap
                    .fromTo(elements[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }) // Enter 2
                    .to({}, { duration: 0.5 }) // Hold 2
                    .to(elements[1], { opacity: 0, y: -40, duration: 1, ease: "power2.inOut" }) // Exit 2
                    .to({}, { duration: 0.5 }) // Gap
                    .fromTo(elements[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }); // Enter 3

            } else {
                // Mobile simple fade
                slidesRef.current.forEach((slide) => {
                    gsap.from(slide, {
                        scrollTrigger: {
                            trigger: slide,
                            start: "top 80%",
                        },
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                    });
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" ref={containerRef} className="relative h-auto lg:h-screen w-full bg-slate-950">
            <div className="container mx-auto h-full px-6 py-24 lg:py-0 flex flex-col lg:block items-center justify-center">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        ref={(el) => { slidesRef.current[index] = el; }}
                        className={cn(
                            "w-full max-w-4xl mx-auto flex flex-col items-center text-center",
                            "lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2",
                            index === 0 ? "lg:opacity-100" : "lg:opacity-0",
                            "mb-12 lg:mb-0 last:mb-0" // Reduced mobile margin
                        )}
                    >
                        <Badge variant="outline" className="mb-4 font-mono text-xs text-blue-400 border-blue-400/20">{slide.badge}</Badge>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                            {slide.subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
