"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Does MAF add latency to my requests?",
        answer: "Minimal impact (< 5ms). MAF runs logic locally within your application's middleware layer. State lookups to Redis are highly optimized via pipeline.",
    },
    {
        question: "Is my data sent to your servers?",
        answer: "No. MAF operates as a self-hosted auditing sidecar or embedded library. Request payloads stay within your infrastructure. Only anonymized telemetry (if enabled) is sent for global threat intelligence.",
    },
    {
        question: "How does the AI Agent handling work?",
        answer: "For ambiguous requests that pass static rules but show high entropy, MAF can asynchronously queue them for LLM analysis. Ensure you configure PII filtering before enabling this feature.",
    },
    {
        question: "Can I run MAF in a serverless environment?",
        answer: "Yes. MAF is optimized for Vercel Edge, AWS Lambda, and Cloudflare Workers. It uses a stateless architecture with external session stores.",
    },
];

export function FAQ() {
    return (
        <section className="py-24 bg-background border-t border-border/10">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
