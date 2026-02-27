import { Link } from "wouter";
import { Key, Shield, Zap, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-wide">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Crown className="h-5 w-5 text-primary-foreground" />
            </div>
            KingVypers
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/validate">
              <Button variant="ghost" size="sm">
                Validate Key
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm">Admin Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container px-4 py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Roblox Script Key System
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Secure license keys with HWID binding. Generate, validate, and manage keys for your script—all in one place.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/validate">
              <Button size="lg" className="gap-2 text-base">
                <Key className="h-5 w-5" />
                Validate My Key
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="gap-2 text-base">
                Admin Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container px-4">
          <h2 className="font-serif text-3xl font-bold tracking-wide text-center mb-12">
            Why KingVypers?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">HWID Binding</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                One key, one device. Keys bind to hardware ID so they can&apos;t be shared or leaked.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                <Zap className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">Instant Validation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Simple API for your Roblox executor. Validate keys in real time with clear success or error messages.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <Crown className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">Admin Dashboard</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate keys, track revenue, blacklist abuse, and reset HWID—all from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container px-4 py-20">
        <h2 className="font-serif text-3xl font-bold tracking-wide text-center mb-12">
          How It Works
        </h2>
        <div className="mx-auto max-w-2xl space-y-6">
          {[
            { step: 1, title: "Get a key", desc: "Purchase a license key from the script seller (Discord, etc.)." },
            { step: 2, title: "Validate once", desc: "Enter your key in the executor or on this site. It binds to your device (HWID)." },
            { step: 3, title: "Use the script", desc: "As long as the key is active and not expired, you're good to go." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 rounded-lg border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step}
              </div>
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 shrink-0 text-chart-2" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary/5 py-16">
        <div className="container px-4 text-center">
          <h2 className="font-serif text-2xl font-bold tracking-wide">
            Already have a key?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Validate it here or check your key status.
          </p>
          <Link href="/validate">
            <Button size="lg" className="mt-6">
              Validate Key
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <span className="text-sm text-muted-foreground">
            © KingVypers · Key Management System
          </span>
          <div className="flex gap-6">
            <Link href="/validate" className="text-sm text-muted-foreground hover:text-foreground">
              Validate Key
            </Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
