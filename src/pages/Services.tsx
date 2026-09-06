import { useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calculator,
  FileText,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

type Service = {
  icon: LucideIcon;
  slug?: string;
  title: string;
  description: string;
  includes: string[];
  
};

const services: Service[] = [
  {
    icon: BookOpen,
    slug: "bookkeeping",
    title: "Monthly Bookkeeping",
    description:
      "Keep your financial records accurate and current so you can understand how your business is performing and stay prepared for tax and reporting requirements.",
    includes: [
      "Income and expense recording",
      "Bank and credit card reconciliations",
      "Debtors and creditors tracking",
      "Monthly financial reports",
      "Document and record organisation",
    ],
  },
  {
    icon: Calculator,
    slug: "tax-compliance",
    title: "Tax and SARS Compliance",
    description:
      "Get practical support with the tax work your business needs, including organising information, understanding deadlines, and preparing for SARS submissions.",
    includes: [
      "Provisional tax support",
      "Income tax return preparation",
      "VAT calculations and submissions",
      "SARS correspondence support",
      "Compliance deadline guidance",
    ],
  },
  {
    icon: Users,
    slug: "payroll",
    title: "Payroll Administration",
    description:
      "Make monthly payroll easier to manage with accurate records, payslips, and support for the submissions connected to your employees.",
    includes: [
      "Monthly payroll processing",
      "Payslip preparation",
      "PAYE and UIF support",
      "EMP201 and EMP501 support",
      "Leave and payroll record tracking",
    ],
  },
  {
    icon: FileText,
    title: "Annual Financial Statements",
    description:
      "Clear financial statements prepared around your business requirements, whether you need them for compliance, funding, tenders, or better decision-making.",
    includes: [
      "Income statement preparation",
      "Balance sheet preparation",
      "Financial position review",
      "Financial performance review",
      "Support for funding and tender requirements",
    ],
  },
  {
    icon: Building2,
    title: "Company Registration and Setup",
    description:
      "Get help formalising your business and understanding the practical steps involved in setting up the right financial and compliance foundation.",
    includes: [
      "Company registration support",
      "Business setup guidance",
      "Initial compliance checklist",
      "Basic finance process setup",
      "Advice on next steps after registration",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Compliance Certificates and Registrations",
    description:
      "Focused support for once-off requirements such as tax clearance certificates, VAT registration, PAYE registration, and company amendments.",
    includes: [
      "Tax clearance certificate support",
      "VAT registration support",
      "PAYE registration support",
      "CIPC company amendments",
      "Document preparation guidance",
    ],
  },
  {
    icon: Lightbulb,
    title: "Business Advisory",
    description:
      "Understand your numbers more clearly and make better decisions with practical financial guidance based on the way your business operates.",
    includes: [
      "Cash-flow forecasting",
      "Budget versus actual analysis",
      "Profitability and margin reviews",
      "Financial planning",
      "Business performance discussions",
    ],
  },
];
const directOneOffServices = [
  {
    name: "Company Setup/Registration",
    price: 2500,
    priceLabel: "once-off",
    description:
      "Support for entrepreneurs who are formalising their business and need help understanding the registration and compliance steps involved.",
    checkoutUrl:
      "https://whop.com/future-cents/company-setup-registrations/",
  },
  {
    name: "VAT or PAYE Registration Support",
    price: 2000,
    priceLabel: "once-off",
    description:
      "Support with the relevant registration process and required business information.",
    checkoutUrl:
      "https://whop.com/future-cents/vat-or-paye-registration-support/",
  },
  {
    name: "CIPC Amend Company or Director Details",
    price: 550,
    priceLabel: "once-off",
    description:
      "Update company or director information through the appropriate CIPC process.",
    checkoutUrl:
      "https://whop.com/future-cents/cipc-amend-company-or-director-details",
  },
  {
    name: "Tax Clearance Certificate",
    price: 500,
    priceLabel: "per certificate",
    description:
      "Assistance with obtaining a tax clearance certificate for your business needs.",
    checkoutUrl:
      "https://whop.com/future-cents/tax-clearance-certificate/",
  },
];

function formatZar(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}
function updateMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

export default function Services() {
  useEffect(() => {
    const previousTitle = document.title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = description?.content ?? "";

    const ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]',
    );
    const previousOgTitle = ogTitle?.content ?? "";

    const ogDescription = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]',
    );
    const previousOgDescription = ogDescription?.content ?? "";

    const ogUrl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]',
    );
    const previousOgUrl = ogUrl?.content ?? "";

    const twitterTitle = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:title"]',
    );
    const previousTwitterTitle = twitterTitle?.content ?? "";

    const twitterDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:description"]',
    );
    const previousTwitterDescription = twitterDescription?.content ?? "";

    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const previousCanonical = canonical?.href ?? "";

    const pageTitle =
      "Accounting, Tax & Bookkeeping Services in South Africa | FutureCents";

    const pageDescription =
      "Bookkeeping, tax compliance, payroll, financial statements and business support for South African small businesses and owner-managed companies.";

    document.title = pageTitle;

    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);
    updateMeta('meta[property="og:url"]', "https://www.futurecents.co.za/services");
    updateMeta('meta[name="twitter:title"]', pageTitle);
    updateMeta('meta[name="twitter:description"]', pageDescription);

    if (canonical) {
      canonical.href = "https://www.futurecents.co.za/services";
    }

    return () => {
      document.title = previousTitle;

      updateMeta('meta[name="description"]', previousDescription);
      updateMeta('meta[property="og:title"]', previousOgTitle);
      updateMeta('meta[property="og:description"]', previousOgDescription);
      updateMeta('meta[property="og:url"]', previousOgUrl);
      updateMeta('meta[name="twitter:title"]', previousTwitterTitle);
      updateMeta('meta[name="twitter:description"]', previousTwitterDescription);

      if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="relative overflow-hidden bg-background pb-20 pt-40 sm:pb-28 sm:pt-48">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[520px] w-[55%] rounded-bl-[160px] bg-primary/[0.045]" />

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
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Our services
            </p>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Accounting And Tax Services For Your Business Needs.
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              FutureCents helps owner-managed businesses stay organised,
              understand their numbers, and keep the financial work behind the
              business moving in the right direction.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/27816733268"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-sm font-bold text-white transition-colors hover:bg-[#20b858]"
              >
                Chat with us on WhatsApp
                <MessageSquare className="h-4 w-4" />
              </a>

              <a
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
              >
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="service-list"
        aria-labelledby="service-list-heading"
        className="border-y border-border bg-white py-20 sm:py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              How we can help
            </p>

            <h2
              id="service-list-heading"
              className="text-3xl font-extrabold text-foreground sm:text-4xl"
            >
              Practical support for every stage of your business
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Start with one focused task or build an ongoing support plan
              around the financial work your business needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="flex h-full flex-col rounded-2xl border border-border bg-background p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-border pt-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                      What this can include
                    </p>

                    <ul className="space-y-3">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {service.slug && (
  <a
    href={`/services/${service.slug}`}
    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
  >
    Learn more
    <ArrowRight className="h-4 w-4" />
  </a>
)}
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="once-off-services"
        className="bg-background py-20 sm:py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Once-off services
              </p>

              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Need help with one specific task?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Get focused help with a registration, certificate, compliance
                task, or other once-off finance requirement.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {directOneOffServices.map((service) => (
                <article
                  key={service.name}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">
                      {service.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>

                    <div className="mt-6">
                      <span className="text-2xl font-extrabold text-primary">
                        {formatZar(service.price)}
                      </span>

                      <span className="ml-2 text-xs font-semibold text-muted-foreground">
                        {service.priceLabel}
                      </span>
                    </div>
                  </div>

                  <a
                    href={service.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Choose this service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary">
              Not sure where to start?
            </p>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Tell us what your business needs
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              We will understand your current position, explain the practical
              options, and recommend the right next step.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/27816733268"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-6 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/#contact"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-primary-foreground/30 px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Send an enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://www.futurecents.co.za/services",
              url: "https://www.futurecents.co.za/services",
              name: "Accounting, Tax & Bookkeeping Services in South Africa | FutureCents",
              description:
                "Bookkeeping, tax compliance, payroll, financial statements and business support for South African small businesses and owner-managed companies.",
              isPartOf: {
                "@id": "https://www.futurecents.co.za/#website",
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.futurecents.co.za/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: "https://www.futurecents.co.za/services",
                },
              ],
            },
            {
              "@type": "ItemList",
              name: "FutureCents services",
              itemListElement: services.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: service.title,
                description: service.description,
              })),
            },
          ],
        })}
      </script>

      <Footer />
    </main>
  );
}