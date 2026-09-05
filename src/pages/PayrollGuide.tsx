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

const payrollSections = [
  {
    heading: "What does payroll administration involve?",
    text:
      "Payroll administration is the process of calculating employee pay, preparing payslips, recording deductions and keeping the information needed for payroll-related submissions and reports.",
  },
  {
    heading: "Why accurate payroll matters",
    text:
      "Accurate payroll helps employees receive the correct information, gives the business reliable employment records and reduces the risk of problems caused by missing or inconsistent payroll data.",
  },
  {
    heading: "Payroll records a business should organise",
    text:
      "Businesses should keep employee information, employment agreements, salary details, payslips, leave records, deductions, payment records and relevant payroll correspondence.",
  },
  {
    heading: "A practical monthly payroll process",
    text:
      "A consistent monthly process usually includes reviewing employee changes, confirming hours or salary information, calculating pay, checking deductions, preparing payslips and storing the final payroll records.",
  },
  {
    heading: "PAYE and UIF administration",
    text:
      "Businesses with employees may have payroll-related responsibilities such as PAYE and UIF administration. The exact obligations depend on the business and its employees, so records should be reviewed carefully.",
  },
  {
    heading: "When should you get payroll help?",
    text:
      "Professional payroll support may be useful when you employ your first staff members, payroll is taking too much time, records are inconsistent or you need help understanding payroll-related submissions.",
  },
];

export default function PayrollGuide() {
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
      "Payroll for Small Businesses in South Africa: Practical Guide | FutureCents";

    const pageDescription =
      "Learn how payroll administration works for South African small businesses, including payslips, payroll records, PAYE, UIF and monthly payroll processes.";

    document.title = pageTitle;

    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);
    updateMeta(
      'meta[property="og:url"]',
      "https://www.futurecents.co.za/guides/payroll-south-africa",
    );
    updateMeta('meta[name="twitter:title"]', pageTitle);
    updateMeta('meta[name="twitter:description"]', pageDescription);

    if (canonical) {
      canonical.href =
        "https://www.futurecents.co.za/guides/payroll-south-africa";
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

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
              Payroll for small businesses in South Africa: a practical guide
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Understand the basics of payroll administration, the records to
              keep and when your business may need payroll support.
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              General educational information only. Payroll obligations depend
              on your business and employee circumstances.
            </p>
          </div>
        </div>
      </section>

      <article className="border-y border-border bg-white py-16 sm:py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            {payrollSections.map((section) => (
              <section key={section.heading} className="mt-14 first:mt-0">
                <h2 className="text-3xl font-extrabold text-foreground">
                  {section.heading}
                </h2>

                <p className="mt-5 leading-8 text-muted-foreground">
                  {section.text}
                </p>
              </section>
            ))}

            <section className="mt-14">
              <h2 className="text-3xl font-extrabold text-foreground">
                A simple payroll checklist
              </h2>

              <ul className="mt-6 space-y-4">
                {[
                  "Keep employee information current",
                  "Record salary or hourly changes",
                  "Track leave and other approved adjustments",
                  "Review deductions before finalising payroll",
                  "Prepare and check payslips",
                  "Store payroll records securely",
                  "Keep proof of payroll payments",
                  "Review payroll-related submissions on time",
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
              <h2 className="text-3xl font-extrabold text-foreground">
                Common payroll mistakes
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Common problems include outdated employee information,
                incorrect deductions, missing payslips, poor leave records and
                failing to keep proof of payroll payments.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                Payroll also becomes more difficult when employee changes are
                not communicated before the monthly process is completed.
              </p>
            </section>

            <section className="mt-14 rounded-2xl border border-border bg-background p-7">
              <h2 className="text-2xl font-extrabold text-foreground">
                Need help with payroll?
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                FutureCents provides payroll administration support for South
                African small businesses and owner-managed companies.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/services/payroll"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  View payroll services
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
            "Payroll for small businesses in South Africa: a practical guide",
          description:
            "Learn how payroll administration works for South African small businesses, including payslips, payroll records, PAYE, UIF and monthly payroll processes.",
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
              "https://www.futurecents.co.za/guides/payroll-south-africa",
          },
        })}
      </script>

      <Footer />
    </main>
  );
}