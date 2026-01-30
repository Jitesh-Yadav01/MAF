"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Check if user has visited in this session
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (hasVisited) {
            setIsComplete(true);
            setShouldRender(false);
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsComplete(true);
                    sessionStorage.setItem("hasVisited", "true");
                },
            });

            // 1. Counter Animation (0 -> 100)
            tl.to(counterRef.current, {
                innerText: 100,
                duration: 1.5,
                snap: { innerText: 1 }, // Snap to integers
                ease: "power2.out",
                onUpdate: function () {
                    if (counterRef.current) {
                        counterRef.current.innerText = Math.round(this.targets()[0].innerText).toString();
                    }
                },
            });

            // 2. Progress Bar
            tl.to(progressRef.current, {
                width: "100%",
                duration: 1.5,
                ease: "power2.out",
            }, "<");

            // 3. Reveal Content (Slide up curtain)
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
                delay: 0.2,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (isComplete || !shouldRender) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
        >
            {/* Large Counter */}
            <div className="text-9xl font-bold font-mono tracking-tighter tabular-nums mb-8 flex items-end">
                <span ref={counterRef}>0</span>
                <span className="text-4xl mb-4 ml-2 text-muted-foreground">%</span>
            </div>

            {/* Loading text/status */}
            <div className="flex flex-col items-center gap-2 mb-12">
                <div className="flex gap-2 items-center text-muted-foreground uppercase tracking-widest text-xs">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    Initializing MAF System...
                </div>
            </div>

            {/* Progress Bar container */}
            <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
                <div ref={progressRef} className="h-full bg-primary w-0" />
            </div>
        </div>
    );
}
