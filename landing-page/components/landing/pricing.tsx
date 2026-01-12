"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { SlideIn } from "@/components/ui/slide-in";

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <SlideIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-muted-foreground">
                            Start free, scale with your traffic.
                        </p>
                    </div>
                </SlideIn>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Developer Tier */}
                    <SlideIn delay={100} className="h-full">
                        <Card className="border-border/40 relative h-full flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-2xl">Developer</CardTitle>
                                <div className="text-3xl font-bold mt-2">$0 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Up to 100k requests/mo</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Basic Risk Rules</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> 3-Day Audit Log Retention</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Community Support</li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="outline">Start for Free</Button>
                            </CardFooter>
                        </Card>
                    </SlideIn>

                    {/* Startup Tier */}
                    <SlideIn delay={200} className="h-full relative z-10">
                        <Card className="border-primary/50 bg-primary/5 relative scale-105 shadow-xl h-full flex flex-col">
                            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                                POPULAR
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">Startup</CardTitle>
                                <div className="text-3xl font-bold mt-2">$49 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Up to 5M requests/mo</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Advanced AI Agents</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> 30-Day Audit Log Retention</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Email Support</li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Get Started</Button>
                            </CardFooter>
                        </Card>
                    </SlideIn>

                    {/* Enterprise Tier */}
                    <SlideIn delay={300} className="h-full">
                        <Card className="border-border/40 h-full flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-2xl">Enterprise</CardTitle>
                                <div className="text-3xl font-bold mt-2">Custom</div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited requests</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Custom Risk Models</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> 1-Year Log Retention</li>
                                    <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Dedicated Solutions Engineer</li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="outline">Contact Sales</Button>
                            </CardFooter>
                        </Card>
                    </SlideIn>
                </div>
            </div>
        </section>
    );
}
