import { useEffect } from "react";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

function updateMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

export default function BookkeepingGuide() {
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
      "Small Business Bookkeeping in South Africa: A Practical Guide | FutureCents";

    const pageDescription =
      "Learn how bookkeeping works, which financial records to keep and why accurate bookkeeping matters for South African small businesses.";

    document.title = pageTitle;

    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);
    updateMeta(
      'meta[property="og:url"]',
      "https://www.futurecents.co.za/guides/bookkeeping-south-africa",
    );
    updateMeta('meta[name="twitter:title"]', pageTitle);
    updateMeta('meta[name="twitter:description"]', pageDescription);

    if (canonical) {
      canonical.href =
        "https://www.futurecents.co.za/guides/bookkeeping-south-africa";
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
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              <BookOpen className="h-5 w-5" />
              FutureCents guide
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
              Small business bookkeeping in South Africa: a practical guide
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Good bookkeeping helps you understand how your business is
              performing, prepare for tax obligations and make decisions using
              reliable financial information.
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              General educational information only. Your business may require
              advice based on its specific circumstances.
            </p>
          </div>
        </div>
      </section>

      <article className="border-y border-border bg-white py-16 sm:py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <section>
              <h2 className="text-3xl font-extrabold text-foreground">
                What is bookkeeping?
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Bookkeeping is the process of recording and organising the
                financial activity of a business. This includes tracking
                income, expenses, payments, receipts, bank transactions and
                amounts owed by or to the business.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                Accurate bookkeeping gives a business owner a clearer view of
                cash flow, profitability and financial obligations. It also
                makes it easier to prepare reports and provide information to
                an accountant or tax practitioner.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-extrabold text-foreground">
                Why bookkeeping matters for small businesses
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Many small businesses struggle financially not because the
                business has no potential, but because the owner cannot clearly
                see what is happening with the money. Up-to-date records help
                you replace guesswork with useful information.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "See whether the business is making a profit",
                  "Understand where money is being spent",
                  "Monitor unpaid customer invoices",
                  "Prepare more effectively for tax-related work",
                  "Identify cash-flow problems earlier",
                  "Make better decisions about hiring and growth",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-extrabold text-foreground">
                Which records should a business keep?
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                The exact records required depend on the type and structure of
                the business, but most small businesses should maintain an
                organised record of:
              </p>

              <ul className="mt-6 list-disc space-y-3 pl-6 leading-7 text-muted-foreground">
                <li>Sales invoices and customer payments</li>
                <li>Supplier invoices and business expenses</li>
                <li>Business bank statements</li>
                <li>Receipts and supporting documents</li>
                <li>Loan, finance and payment records</li>
                <li>Payroll and employee-related records</li>
                <li>VAT, PAYE and other relevant tax documents</li>
                <li>Important correspondence relating to the business</li>
              </ul>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-extrabold text-foreground">
                A simple monthly bookkeeping routine
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                A consistent monthly routine is usually easier than trying to
                reconstruct the business finances months later.
              </p>

              <ol className="mt-6 list-decimal space-y-4 pl-6 leading-7 text-muted-foreground">
                <li>Collect all sales invoices and proof of income.</li>
                <li>Collect supplier invoices and business receipts.</li>
                <li>Review business bank transactions.</li>
                <li>Match transactions to the correct documents.</li>
                <li>Separate business and personal transactions.</li>
                <li>Review unpaid invoices and upcoming payments.</li>
                <li>Prepare a basic monthly financial report.</li>
                <li>Store the supporting documents in an organised location.</li>
              </ol>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-extrabold text-foreground">
                Common bookkeeping mistakes
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Small errors can create larger problems when they are repeated
                every month. Common mistakes include mixing personal and
                business spending, losing receipts, delaying bank
                reconciliations and failing to follow up on unpaid invoices.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                Another common problem is waiting until tax season to look at
                the records. By then, missing documents and incorrect
                transactions can be more difficult to resolve.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-extrabold text-foreground">
                When should you get bookkeeping help?
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                You may benefit from professional bookkeeping support if your
                records are consistently behind, you are unsure whether the
                business is profitable, you are preparing for tax work or you
                are spending too much time managing financial administration.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                Getting help early can also make it easier to establish a
                repeatable process before the business becomes more complex.
              </p>
            </section>

            <section className="mt-14 rounded-2xl border border-border bg-background p-7">
              <h2 className="text-2xl font-extrabold text-foreground">
                Need help with your business bookkeeping?
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                FutureCents provides bookkeeping support for South African small
                businesses, freelancers and owner-managed companies.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/services/bookkeeping"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  View bookkeeping services
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-bold text-primary hover:bg-primary/5"
                >
                  Contact FutureCents
                </a>
              </div>
            </section>
          </div>
        </div>
      </article>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Small business bookkeeping in South Africa: a practical guide",
          description:
            "Learn how bookkeeping works, which financial records to keep and why accurate bookkeeping matters for South African small businesses.",
          author: {
            "@type": "Organization",
            name: "FutureCents",
          },
          publisher: {
            "@type": "Organization",
            name: "FutureCents",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id":
              "https://www.futurecents.co.za/guides/bookkeeping-south-africa",
          },
        })}
      </script>

      <Footer />
    </main>
  );
}