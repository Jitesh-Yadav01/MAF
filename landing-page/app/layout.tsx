import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Rubik_Storm } from "next/font/google"; // 1. Import
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
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

const rubikStorm = Rubik_Storm({
  weight: "400",
  variable: "--font-rubik-storm",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "MAF",
  description: "maf - Model Application Firewall",
  icons: {
    icon: "/eagle.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${rubikStorm.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
