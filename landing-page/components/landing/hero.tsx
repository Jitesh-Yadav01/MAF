"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IoLogoApple } from "react-icons/io5";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptedText from "../DecryptedText";
import DotGrid from "../DotGrid";

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

    useEffect(() => {
        // Initial setup: Set opacity to 0 via GSAP
        gsap.set([badgeRef.current, titleRef.current, descRef.current, btnsRef.current], {
            opacity: 0,
            y: 50
        });

        const ctx = gsap.context(() => {
            const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

            // Intro Animation
            const introTl = gsap.timeline({ delay: 2.2 });

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
             <div className="absolute inset-0 -z-10 bg-background" ref={bgRef}>
                <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#271E37"
                    activeColor="#5227FF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            <div ref={contentRef} className="container mx-auto px-6 flex flex-col items-center text-center z-10 mt-48">
                <div ref={badgeRef} className="mb-6 opacity-0 w-full flex justify-center">
                    <Badge variant="outline" className="px-3 py-1 text-xs font-mono border-primary/20 bg-primary/10 text-primary">
                        SECURITY MIDDLEWARE SDK
                    </Badge>
                </div>

                <h1 ref={titleRef} className="mb-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 opacity-0">
                    <DecryptedText
                        text="Application-Level Request Security"
                        animateOn="view"
                        revealDirection="center"
                        speed={150}
                        maxIterations={20}
                        characters="ABCD1234!?"
                        className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                        parentClassName="inline-block"
                        sequential={true}
                    />
                </h1>

                <p ref={descRef} className="mb-24 max-w-[700px] text-lg md:text-xl text-muted-foreground opacity-0">
                    Intercept malicious requests before they reach your business logic.
                    Prevent session hijacking, device spoofing, and API abuse with a single robust SDK.
                </p>

                <div ref={btnsRef} className="flex flex-col items-center gap-8 opacity-0">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div>
                            <Button className="rounded-xl px-5 h-10 text-sm bg-white text-black hover:bg-white/90 gap-2 font-medium" draggable={false}>
                                <IoLogoApple className="w-4 h-4" />
                                Download for Mac
                            </Button>
                        </div>
                        <div>
                            <Button className="rounded-xl px-5 h-10 text-sm bg-white text-black hover:bg-white/90 gap-2 font-medium" draggable={false}>
                                <Image src="/windows.webp" alt="Windows" width={20} height={20} className="w-4 h-4" />
                                Download for Windows (beta)
                            </Button>
                        </div>
                    </div>

                    <div className="font-mono text-xs text-muted-foreground/60 tracking-wider">
                        v1.104.3  |  macOS 13+  |  Install via homebrew
                    </div>

                    <div className="group relative rounded-full border border-white/10 bg-white/5 px-4 py-1.5 transition-colors hover:bg-white/10 cursor-pointer">
                        <span className="text-sm font-medium text-white/90">
                            Introducing MAF for Windows <span className="text-muted-foreground">|</span> <span className="text-primary hover:text-primary/90 transition-colors">Download now →</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
