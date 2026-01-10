"use client";

import Link from "next/link";
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

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Architecture",
        href: "#",
        description: "Learn how MAF's modular design scales with your needs.",
    },
    {
        title: "Automation",
        href: "#",
        description: "Built-in CI/CD and workflow optimizations.",
    },
    {
        title: "Integrations",
        href: "#",
        description: "Connect with your favorite tools seamlessly.",
    },
    {
        title: "Security",
        href: "#",
        description: "Enterprise-grade security defaults.",
    },
    {
        title: "Performance",
        href: "#",
        description: "Optimized for speed and efficiency.",
    },
];

const useCases: { title: string; href: string; description: string }[] = [
    {
        title: "Startups",
        href: "#",
        description: "Launch fast and scale without technical debt.",
    },
    {
        title: "SaaS Products",
        href: "#",
        description: "Robust foundation for customer-facing applications.",
    },
    {
        title: "Internal Tools",
        href: "#",
        description: "Rapidly build dashboards and admin panels.",
    },
    {
        title: "Enterprise Systems",
        href: "#",
        description: "Scalable infrastructure for large organizations.",
    },
];

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-mono text-xl font-bold tracking-tight">
                        MAF
                    </Link>

                    <div className="hidden md:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href="#" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Overview
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover">
                                            {components.map((component) => (
                                                <ListItem
                                                    key={component.title}
                                                    title={component.title}
                                                    href={component.href}
                                                >
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Use Cases</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover">
                                            {useCases.map((useCase) => (
                                                <ListItem
                                                    key={useCase.title}
                                                    title={useCase.title}
                                                    href={useCase.href}
                                                >
                                                    {useCase.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="#" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Docs
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="#" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Community
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                        GitHub
                    </Button>
                    <ModeToggle />
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
