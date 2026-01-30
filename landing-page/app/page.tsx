import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/home/hero";
import { WhyMaf } from "@/components/home/why-maf";
import { CoreCapabilities } from "@/components/home/core-capabilities";
import { CodePreview } from "@/components/home/code-preview";
import { Security } from "@/components/home/security";

import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/footer/footer";
import { Preloader } from "@/components/ui/effects/preloader";

import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <main className="flex min-h-screen flex-col selection:bg-primary/20">
      <Preloader />
      <Navbar />
      <Hero />

      <div className="relative z-10 bg-background">
        <CodePreview />

        {/* Auth0 quickstart demo: show login/logout links and user info (server-side) */}
        <div className="p-6">
          {!session ? (
            <div>
              <a href="/auth/login" className="text-primary underline">
                Login
              </a>{" "}
              or {" "}
              <a href="/auth/login?screen_hint=signup" className="text-primary underline">
                Signup
              </a>
            </div>
          ) : (
            <div>
              <p className="mb-2">Logged in as {session.user.email}</p>
              <a href="/auth/logout" className="text-primary underline">
                Logout
              </a>
            </div>
          )}
        </div>

        <CoreCapabilities />
        {/* <WhyMaf /> */}
        <Security />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
