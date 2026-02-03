import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import DashboardPanel from "@/components/responsiveness/dashboard-panel";
import { Navbar } from "@/components/responsiveness/navbar";
import { Preloader } from "@/components/ui/effects/preloader";
import { Footer } from "@/components/responsiveness/footer";

export default async function DashboardPage() {
  const session = await auth0.getSession();
  if (!session) {
    // Not authenticated: send to Auth0 login and return to dashboard after login
    redirect('/auth/login?returnTo=/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col selection:bg-primary/20">
      <Preloader />
      <Navbar />

      <div className="relative z-10 bg-background">
        <div className="mx-auto w-full max-w-4xl p-6">
          <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
          <DashboardPanel user={session.user} />
        </div>
      </div>

      <Footer />
    </main>
  );
} 
