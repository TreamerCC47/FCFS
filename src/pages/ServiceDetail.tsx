import { useEffect } from "react";
import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import { useRoute } from "wouter";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  includes: string[];
  bestFor: string[];
  metaTitle: string;
  metaDescription: string;
};

const servicePages: Record<string, ServicePage> = {
  bookkeeping: {
    slug: "bookkeeping",
    eyebrow: "Bookkeeping services",
    title: "Reliable bookkeeping for South African small businesses",
    intro:
      "Keep your business records accurate, organised and ready for better decisions.",
    description:
      "FutureCents provides practical bookkeeping support for small businesses, freelancers and owner-managed companies. We help you keep track of income, expenses, reconciliations and financial reports without the stress of managing everything alone.",
    includes: [
      "Income and expense recording",
      "Bank and credit card reconciliations",
      "Debtors and creditors tracking",
      "Monthly financial reports",
      "Document and record organisation",
      "Cash-flow visibility",
    ],
    bestFor: [
      "Small businesses that are behind on their records",
      "Business owners who need monthly financial reports",
      "Freelancers who want organised financial information",
      "Companies preparing for tax or annual financial statements",
    ],
    metaTitle: "Bookkeeping Services for Small Businesses | FutureCents",
    metaDescription:
      "Professional bookkeeping support for South African small businesses, freelancers and owner-managed companies. Keep your records accurate and organised with FutureCents.",
  },

  "tax-compliance": {
    slug: "tax-compliance",
    eyebrow: "Tax and SARS compliance",
    title: "Tax compliance support for South African businesses",
    intro:
      "Stay prepared for SARS deadlines with practical tax support built around your business.",
    description:
      "FutureCents helps small businesses understand and manage their tax responsibilities. We support the preparation of financial information, tax returns, VAT processes and compliance deadlines.",
    includes: [
      "Provisional tax support",
      "Income tax return preparation",
      "VAT calculations and submissions",
      "SARS correspondence support",
      "Compliance deadline guidance",
      "Tax information organisation",
    ],
    bestFor: [
      "Businesses that need help preparing for tax submissions",
      "Owner-managed companies unsure about SARS deadlines",
      "Businesses registering for VAT or PAYE",
      "Small businesses that need better financial records before tax season",
    ],
    metaTitle: "Tax and SARS Compliance Services | FutureCents",
    metaDescription:
      "Tax and SARS compliance support for South African small businesses, including provisional tax, income tax, VAT and practical compliance guidance.",
  },

  payroll: {
    slug: "payroll",
    eyebrow: "Payroll administration",
    title: "Payroll administration for growing businesses",
    intro:
      "Make monthly payroll simpler with accurate records, payslips and submission support.",
    description:
      "FutureCents helps businesses manage recurring payroll administration and the compliance work connected to employees. Our support helps you keep payroll information consistent and easier to review each month.",
    includes: [
      "Monthly payroll processing",
      "Payslip preparation",
      "PAYE and UIF support",
      "EMP201 support",
      "EMP501 support",
      "Leave and payroll record tracking",
    ],
    bestFor: [
      "Small businesses employing their first team members",
      "Businesses that need consistent monthly payroll processing",
      "Employers who need PAYE and UIF support",
      "Business owners who want better payroll records",
    ],
    metaTitle: "Payroll Services for Small Businesses | FutureCents",
    metaDescription:
      "Payroll administration for South African small businesses, including payslips, PAYE, UIF, EMP201 and EMP501 support from FutureCents.",
  },
};

function updateMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const service = params ? servicePages[params.slug] : undefined;

  useEffect(() => {
    if (!service) {
      return;
    }

    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = description?.content ?? "";

    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const previousCanonical = canonical?.href ?? "";

    document.title = service.metaTitle;

    updateMeta('meta[name="description"]', service.metaDescription);
    updateMeta('meta[property="og:title"]', service.metaTitle);
    updateMeta('meta[property="og:description"]', service.metaDescription);
    updateMeta(
      'meta[property="og:url"]',
      `https://www.futurecents.co.za/services/${service.slug}`,
    );
    updateMeta('meta[name="twitter:title"]', service.metaTitle);
    updateMeta('meta[name="twitter:description"]', service.metaDescription);

    if (canonical) {
      canonical.href = `https://www.futurecents.co.za/services/${service.slug}`;
    }

    return () => {
      document.title = previousTitle;
      updateMeta('meta[name="description"]', previousDescription);

      if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, [service]);

  if (!service) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="container mx-auto px-6 pb-24 pt-40 text-center">
          <h1 className="text-4xl font-extrabold text-foreground">
            Service not found
          </h1>

          <a
            href="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="bg-background pb-20 pt-40 sm:pb-28 sm:pt-48">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {service.eyebrow}
            </p>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              {service.title}
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {service.intro}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/27816733268"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-sm font-bold text-white hover:bg-[#20b858]"
              >
                Chat on WhatsApp
                <MessageSquare className="h-4 w-4" />
              </a>

              <a
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border px-6 text-sm font-bold text-primary hover:bg-primary/5"
              >
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-20 sm:py-24">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              How we help
            </p>

            <h2 className="text-2xl font-extrabold text-foreground sm:text-4xl">
              Practical support without unnecessary complexity
            </h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              {service.description}
            </p>

            <p className="mt-5 leading-8 text-muted-foreground">
              We work with you to understand the current position of your
              business and provide support that fits your actual needs.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-7">
            <h2 className="text-xl font-bold text-foreground">
              What this service can include
            </h2>

            <ul className="mt-6 space-y-4">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Is this right for you?
            </p>

            <h2 className="text-2xl font-extrabold text-foreground sm:text-4xl">
              This support may be useful if:
            </h2>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.bestFor.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-white p-5 leading-7 text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="/services"
                className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
              >
                View all FutureCents services
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-center text-primary-foreground sm:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to get your finances in order?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/80">
            Tell us what your business needs and we will help you identify the
            right next step.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-secondary px-6 text-sm font-bold text-secondary-foreground hover:bg-secondary/90"
          >
            Send an enquiry
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          provider: {
            "@type": "AccountingService",
            name: "FutureCents",
            url: "https://www.futurecents.co.za/",
          },
          areaServed: {
            "@type": "Country",
            name: "South Africa",
          },
          url: `https://www.futurecents.co.za/services/${service.slug}`,
        })}
      </script>

      <Footer />
    </main>
  );
}