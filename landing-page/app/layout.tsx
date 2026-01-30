import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Rubik_Glitch_Pop, Jersey_20, Tiny5 } from "next/font/google"; // 1. Import
import "./globals.css";
import TargetCursor from "@/components/ui/effects/target-cursor";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const rubikGlitchPop = Rubik_Glitch_Pop({
  weight: "400",
  variable: "--font-rubik-glitch-pop",
  subsets: ["latin"],
});

const jersey20 = Jersey_20({
  weight: "400",
  variable: "--font-jersey-20",
  subsets: ["latin"],
});

const tiny5 = Tiny5({
  weight: "400",
  variable: "--font-tiny5",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "MAF",
  description: "maf - Model Application Firewall",
  icons: {
    icon: [
      { url: "/eaglelogoBlack.svg", sizes: "8xl" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${rubikGlitchPop.variable} ${jersey20.variable} ${tiny5.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TargetCursor
            targetSelector="button, a, .cursor-target"
            spinDuration={2}
            hideDefaultCursor={true}
            parallaxOn={true}
            hoverDuration={0.2}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
