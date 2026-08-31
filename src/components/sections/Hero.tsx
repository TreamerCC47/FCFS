import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    "Monthly bookkeeping",
    "Tax and SARS support",
    "Payroll and compliance",
    "Clear monthly reporting",
  ];

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[620px] w-[52%] rounded-bl-[160px] bg-primary/[0.045]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #14523e 1px, transparent 1px), linear-gradient(to bottom, #14523e 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3.5 py-2 text-sm font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Accounting support for South African small businesses
            </div>

            <h1 className="mb-7 max-w-2xl text-5xl font-extrabold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Clear numbers.
              <br />
              <span className="text-primary">Confident decisions.</span>
            </h1>

            <p className="mb-9 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              FutureCents helps owner-managed businesses stay organised with
              practical bookkeeping, tax, payroll, and compliance support.
              Clear advice, dependable follow-through, and no unnecessary
              jargon.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 gap-2 bg-[#25D366] px-7 text-base text-white shadow-sm hover:bg-[#20b858]"
              >
                <a
                  href="https://wa.me/27816733268"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat with us on WhatsApp
                  <MessageSquare className="h-5 w-5" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#pricing")}
                className="h-14 gap-2 border-border bg-background px-7 text-base"
              >
                View pricing
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                South African SME focus
              </span>

              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Remote across South Africa
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative rounded-3xl border border-border bg-white p-7 shadow-xl sm:p-9">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Your finance partner
                  </p>

                  <h2 className="text-2xl font-bold leading-tight text-foreground">
                    The numbers,
                    <br />
                    taken care of.
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                {services.map((service) => (
                  <div key={service} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>

                    <span className="text-sm font-semibold text-foreground">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-background p-5">
                <p className="text-sm leading-6 text-muted-foreground">
                  Built for businesses that want reliable financial support
                  without the cost or formality of a large corporate firm.
                </p>

                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/75"
                >
                  Start a conversation
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("#services")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary sm:flex"
        aria-label="Scroll to services"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
          Explore
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </section>
  );
}