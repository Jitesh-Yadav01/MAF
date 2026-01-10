"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMagnetic } from "@/hooks/use-magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Text element refs for intro animation
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const btnsRef = useRef<HTMLDivElement>(null);

    const primaryBtnRef = useMagnetic();
    const secondaryBtnRef = useMagnetic();

    useEffect(() => {
        // Initial setup: Set opacity to 0 via GSAP to ensure control
        gsap.set([badgeRef.current, titleRef.current, descRef.current, btnsRef.current], {
            opacity: 0,
            y: 50
        });

        const ctx = gsap.context(() => {
            const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

            // Intro Animation
            const introTl = gsap.timeline({ delay: 2.2 });

            // Use .to() because we are animating FROM the hidden state (set above) TO the visible state.
            introTl.to([badgeRef.current, titleRef.current, descRef.current, btnsRef.current], {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "back.out(1.7)",
            });

            if (isDesktop) {
                // Scroll Animation
                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=200%",
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                scrollTl.to(contentRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    y: -50,
                    duration: 1,
                    ease: "power2.inOut",
                })
                    .to(bgRef.current, {
                        scale: 1.05,
                        opacity: 0.5,
                        duration: 1,
                        ease: "none",
                    }, "<");
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <div
                ref={bgRef}
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-background to-background"
            />

            <div ref={contentRef} className="container mx-auto px-6 flex flex-col items-center text-center z-10">
                <div ref={badgeRef} className="mb-6 opacity-0">
                    <Badge variant="secondary" className="px-3 py-1 rounded-full text-xs font-mono">
                        v1.0 is now available
                    </Badge>
                </div>

                <h1 ref={titleRef} className="mb-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 opacity-0">
                    Build, Automate, and Scale with MAF
                </h1>

                <p ref={descRef} className="mb-10 max-w-[700px] text-lg md:text-xl text-muted-foreground opacity-0">
                    MAF is a modern platform for building scalable digital systems with speed, structure, and precision.
                </p>

                <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 items-center opacity-0">
                    <div ref={primaryBtnRef as any}>
                        <Button size="lg" className="rounded-full px-8 h-12 text-base">
                            Get Started
                        </Button>
                    </div>
                    <div ref={secondaryBtnRef as any}>
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base">
                            View Documentation
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
