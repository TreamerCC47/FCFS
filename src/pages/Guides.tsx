import { useEffect } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const guides = [
  {
    title: "Small business bookkeeping in South Africa",
    description:
      "Learn how bookkeeping works, which records to keep and why accurate financial information matters.",
    href: "/guides/bookkeeping-south-africa",
    category: "Bookkeeping",
  },
  {
    title: "Small business tax compliance in South Africa",
    description:
      "Understand the records, processes and communication habits that support better tax compliance.",
    href: "/guides/tax-compliance-south-africa",
    category: "Tax compliance",
  },
  {
    title: "Payroll for small businesses in South Africa",
    description:
      "Understand payroll administration, payslips, payroll records, PAYE, UIF and monthly payroll processes.",
    href: "/guides/payroll-south-africa",
    category: "Payroll",
  },
];

function updateMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

export default function Guides() {
  useEffect(() => {
    const previousTitle = document.title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = description?.content ?? "";

    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const previousCanonical = canonical?.href ?? "";

    const pageTitle =
      "Small Business Accounting Guides in South Africa | FutureCents";

    const pageDescription =
      "Practical bookkeeping, tax compliance and payroll guides for South African small businesses and owner-managed companies.";

    document.title = pageTitle;

    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);
    updateMeta('meta[property="og:url"]', "https://www.futurecents.co.za/guides");
    updateMeta('meta[name="twitter:title"]', pageTitle);
    updateMeta('meta[name="twitter:description"]', pageDescription);

    if (canonical) {
      canonical.href = "https://www.futurecents.co.za/guides";
    }

    return () => {
      document.title = previousTitle;
      updateMeta('meta[name="description"]', previousDescription);

      if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="bg-background pb-20 pt-40 sm:pb-28 sm:pt-48">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              <BookOpen className="h-5 w-5" />
              FutureCents guides
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Practical accounting guides for South African small businesses
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Clear, practical information to help you understand bookkeeping,
              tax compliance, payroll and the financial side of running a
              business.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <article
                key={guide.href}
                className="flex h-full flex-col rounded-2xl border border-border bg-background p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
                  {guide.category}
                </p>

                <h2 className="mt-5 text-2xl font-extrabold leading-tight text-foreground">
                  {guide.title}
                </h2>

                <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                  {guide.description}
                </p>

                <a
                  href={guide.href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  Read the guide
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-center text-primary-foreground sm:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Need help with your business finances?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/80">
            FutureCents provides practical bookkeeping, tax and payroll support
            for South African small businesses.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-secondary px-6 text-sm font-bold text-secondary-foreground hover:bg-secondary/90"
          >
            Contact FutureCents
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Small Business Accounting Guides in South Africa",
          description:
            "Practical bookkeeping, tax compliance and payroll guides for South African small businesses.",
          url: "https://www.futurecents.co.za/guides",
          hasPart: guides.map((guide) => ({
            "@type": "Article",
            headline: guide.title,
            url: `https://www.futurecents.co.za${guide.href}`,
            description: guide.description,
          })),
        })}
      </script>

      <Footer />
    </main>
  );
}