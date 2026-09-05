import { useEffect } from "react";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

function updateMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

export default function TaxComplianceGuide() {
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
      "Small Business Tax Compliance in South Africa: Practical Guide | FutureCents";

    const pageDescription =
      "A practical guide to tax compliance for South African small businesses, including records, SARS communication, VAT, payroll taxes and tax preparation.";

    document.title = pageTitle;

    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);
    updateMeta(
      'meta[property="og:url"]',
      "https://www.futurecents.co.za/guides/tax-compliance-south-africa",
    );
    updateMeta('meta[name="twitter:title"]', pageTitle);
    updateMeta('meta[name="twitter:description"]', pageDescription);

    if (canonical) {
      canonical.href =
        "https://www.futurecents.co.za/guides/tax-compliance-south-africa";
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
              <FileText className="h-5 w-5" />
              FutureCents guide
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Small Business Tax Compliance in South Africa: A Practical Guide
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Understand the records, processes and communication habits that
              can help your business stay prepared for its tax obligations.
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              General educational information only. Tax obligations depend on
              your business structure and circumstances.
            </p>
          </div>
        </div>
      </section>

      <article className="border-y border-border bg-white py-16 sm:py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <section>
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                What does tax compliance mean?
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Tax compliance means meeting the registration, record-keeping,
                reporting, payment and communication responsibilities that
                apply to your business.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                The exact requirements depend on factors such as your business
                structure, employees, turnover, activities and registrations.
                Keeping accurate financial records is the foundation for
                understanding which obligations apply.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                Tax-related areas small businesses may need to manage
              </h2>

              <div className="mt-7 space-y-5">
                {[
                  {
                    title: "Income tax",
                    text: "Businesses generally need to report relevant income and expenses accurately and keep supporting records for their tax reporting.",
                  },
                  {
                    title: "Provisional tax",
                    text: "Some taxpayers may need to make payments during the year based on estimated taxable income. Planning ahead can help avoid last-minute pressure.",
                  },
                  {
                    title: "VAT",
                    text: "VAT responsibilities depend on the business’s registration status and circumstances. Registered businesses need consistent records for their VAT calculations and submissions.",
                  },
                  {
                    title: "Payroll-related taxes",
                    text: "Businesses with employees may need to manage payroll records and submissions connected to employee taxes and statutory deductions.",
                  },
                  {
                    title: "SARS correspondence",
                    text: "Requests, notices and assessments should be reviewed promptly and stored with the business records.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-background p-6"
                  >
                    <h3 className="text-xl font-bold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                Records your business should organise
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Good records make it easier to prepare tax information,
                investigate questions and understand the financial position of
                the business.
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  "Sales invoices and proof of income",
                  "Supplier invoices and business expenses",
                  "Bank statements and reconciliations",
                  "Receipts and supporting documents",
                  "Payroll and employee records",
                  "Asset and equipment information",
                  "Previous tax submissions and assessments",
                  "SARS notices and correspondence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="leading-7 text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                A practical tax-preparation checklist
              </h2>

              <ol className="mt-6 list-decimal space-y-4 pl-6 leading-7 text-muted-foreground">
                <li>Keep business and personal transactions separate.</li>
                <li>Update the bookkeeping records regularly.</li>
                <li>Store invoices, receipts and statements together.</li>
                <li>Review unpaid invoices and outstanding expenses.</li>
                <li>Check that bank transactions have been reconciled.</li>
                <li>Keep copies of previous submissions and assessments.</li>
                <li>Review SARS communication promptly.</li>
                <li>Ask for help before a deadline becomes urgent.</li>
              </ol>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                Common tax compliance mistakes
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Common problems include missing records, late responses,
                incomplete bookkeeping, mixing personal and business
                transactions, and assuming that no tax is payable means no
                reporting is required.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                Another common mistake is waiting until the end of the year to
                discover that important documents are missing. A regular
                bookkeeping and review process makes these issues easier to
                identify earlier.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                When should you get tax compliance help?
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Professional support may be useful if you are unsure which
                registrations apply, have fallen behind with your records,
                received SARS correspondence, employ staff, or need help
                preparing information for a submission.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                Getting help before a deadline gives you more time to find
                missing documents and correct inaccurate records.
              </p>
            </section>

            <section className="mt-14 rounded-2xl border border-border bg-background p-7">
              <h2 className="text-2xl font-extrabold text-foreground">
                Need help with tax compliance?
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                FutureCents provides practical tax and SARS compliance support
                for South African small businesses and owner-managed companies.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/services/tax-compliance"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  View tax compliance services
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
            "Small business tax compliance in South Africa: a practical guide",
          description:
            "A practical guide to tax compliance for South African small businesses, including records, SARS communication, VAT, payroll taxes and tax preparation.",
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
              "https://www.futurecents.co.za/guides/tax-compliance-south-africa",
          },
        })}
      </script>

      <Footer />
    </main>
  );
}