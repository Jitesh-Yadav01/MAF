"use client";

import Link from "next/link";
import Image from "next/image"; // Added import


import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

// Placeholder data for dropdowns if needed, or simple links
const securityFeatures: { title: string; href: string; description: string }[] = [
    {
        title: "Data Handling",
        href: "#",
        description: "Encryption at rest and in transit. GDPR compliant.",
    },
    {
        title: "Audit Logs",
        href: "#",
        description: "Immutable logs stored on MongoDB with blockchain anchoring.",
    },
    {
        title: "Deployment",
        href: "#",
        description: "Edge, Cloud, or On-Premise options available.",
    },
];

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/eagle.svg" alt="MAF Logo" width={40} height={40} className="h-10 w-auto dark:invert" />
                        <span className="font-jetbrains text-2xl font-bold">maf</span>
                    </Link>

                    <div className="hidden md:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/" className={navigationMenuTriggerStyle()}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="#how-it-works" className={navigationMenuTriggerStyle()}>
                                            How It Works
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="#use-cases" className={navigationMenuTriggerStyle()}>
                                            Use Cases
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="#docs" className={navigationMenuTriggerStyle()}>
                                            Docs
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Security</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover">
                                            {securityFeatures.map((feature) => (
                                                <ListItem
                                                    key={feature.title}
                                                    title={feature.title}
                                                    href={feature.href}
                                                >
                                                    {feature.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/pricing" className={navigationMenuTriggerStyle()}>
                                            Pricing
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                        Login
                    </Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </nav>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
