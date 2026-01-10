"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        id: 1,
        title: "Cinematic Motion",
        description: "Scroll-driven animations that feel like a movie, not a website. Every pixel has a purpose.",
        badge: "Motion",
    },
    {
        id: 2,
        title: "Developer First",
        description: "Built with the tools you love. React, Tailwind, and GSAP. Type-safe and production ready.",
        badge: "Tech",
    },
    {
        id: 3,
        title: "Accessible",
        description: "Inclusive by design. Keyboard navigation, screen readers, and reduced motion support built-in.",
        badge: "A11y",
    },
];

export function FeatureStory() {
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
                        end: "+=500%", // Even longer to allow distinct gap phases
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Strict Sequence:
                // Slide 1 visible initally.
                // 1. Slide 1 Exit
                // 2. Gap
                // 3. Slide 2 Enter
                // 4. Slide 2 Hold
                // 5. Slide 2 Exit
                // 6. Gap
                // 7. Slide 3 Enter

                const slides = slidesRef.current;

                // Slide 1 Exit
                tl.to(slides[0], {
                    opacity: 0,
                    y: -50,
                    scale: 0.9,
                    duration: 1,
                    ease: "power2.inOut",
                });

                // Slide 2 Enter
                tl.fromTo(slides[1], {
                    opacity: 0,
                    y: 50,
                    scale: 1.1,
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                });

                // Slide 2 Hold
                tl.to({}, { duration: 0.5 });

                // Slide 2 Exit
                tl.to(slides[1], {
                    opacity: 0,
                    y: -50,
                    scale: 0.9,
                    duration: 1,
                    ease: "power2.inOut",
                });

                // Slide 3 Enter
                tl.fromTo(slides[2], {
                    opacity: 0,
                    y: 50,
                    scale: 1.1,
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                });

                // Slide 3 is the last one, it stays visible until unpin.

            } else {
                // Mobile simple animation
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
        <section
            ref={containerRef}
            className="relative h-auto lg:h-screen w-full bg-slate-900/20"
        >
            <div className="container mx-auto h-full px-6 py-20 lg:py-0 flex flex-col lg:block items-center justify-center">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        ref={(el) => { slidesRef.current[index] = el; }}
                        className={cn(
                            "w-full max-w-2xl mx-auto flex flex-col items-center text-center",
                            "lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2",
                            // Initial CSS state:
                            // Index 0: Visible
                            // Index > 0: Hidden
                            index === 0 ? "lg:opacity-100 lg:scale-100" : "lg:opacity-0 lg:scale-110", // Scale 110 matches enter fromTo
                            "mb-24 lg:mb-0 last:mb-0"
                        )}
                        style={{
                            // Ensure transforms don't conflict initially
                            willChange: "transform, opacity",
                        }}
                    >
                        <Badge variant="outline" className="mb-6 font-mono text-xs">{feature.badge}</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            {feature.title}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
