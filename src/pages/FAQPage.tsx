import { useEffect } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be VAT registered to use FutureCents?",
    answer:
      "No. We work with both VAT-registered and non-VAT businesses. We can help you understand your obligations and identify the appropriate next step for your business.",
  },
  {
    question: "What documents do I need to get started?",
    answer:
      "Typically, we need your company registration documents, recent bank statements, existing bookkeeping records and any SARS correspondence. We will send you a full checklist after your initial discussion.",
  },
  {
    question: "Can you help if my books are behind?",
    answer:
      "Yes. We can assist with bookkeeping catch-ups and once-off backlog work. We will assess how far behind your records are and provide a quote before starting.",
  },
  {
    question: "How does monthly billing work?",
    answer:
      "Monthly services are generally invoiced in advance. Once-off services may require a deposit before work begins. Your exact payment terms will be explained in your engagement documentation.",
  },
  {
    question: "What should I do if SARS contacts me directly?",
    answer:
      "Forward the correspondence to us as soon as possible. We can help you understand what is being requested and advise you on the appropriate response.",
  },
  {
    question: "Is my financial information secure?",
    answer:
      "We take reasonable technical and organisational steps to protect the personal information and financial documents shared with us. Access to information is limited to what is needed for the work being performed.",
  },
  {
    question: "Do you work with businesses outside South Africa?",
    answer:
      "We primarily serve South African-registered businesses. If your business has foreign operations or offshore income, contact us so we can assess whether we are able to assist.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Start dates depend on the service required, the availability of your records and the onboarding process. We will confirm the expected start date after reviewing your requirements.",
  },
  {
    question: "Can you help with payroll?",
    answer:
      "Yes. We can assist with monthly payroll administration, payslips, PAYE, UIF and related payroll records for small businesses.",
  },
  {
    question: "Can you prepare annual financial statements?",
    answer:
      "We can assist with preparing financial information and annual financial statements based on your business requirements. Contact us to discuss the records and reporting format needed.",
  },
];

function updateMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

export default function FAQPage() {
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
      "Accounting and Tax FAQs for South African Small Businesses | FutureCents";

    const pageDescription =
      "Answers to common bookkeeping, tax, payroll, VAT, SARS and financial reporting questions from South African small businesses.";

    document.title = pageTitle;

    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);
    updateMeta('meta[property="og:url"]', "https://www.futurecents.co.za/faq");
    updateMeta('meta[name="twitter:title"]', pageTitle);
    updateMeta('meta[name="twitter:description"]', pageDescription);

    if (canonical) {
      canonical.href = "https://www.futurecents.co.za/faq";
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
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Frequently asked questions
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
              Accounting and tax answers for South African small businesses
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Find answers to common questions about bookkeeping, tax
              compliance, payroll and working with FutureCents.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/27816733268"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-sm font-bold text-white hover:bg-[#20b858]"
              >
                Ask us on WhatsApp
                <MessageSquare className="h-4 w-4" />
              </a>

              <a
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border px-6 text-sm font-bold text-primary hover:bg-primary/5"
              >
                Send an enquiry
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-20 sm:py-24">
        <div className="container mx-auto max-w-4xl px-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="rounded-lg border border-border bg-background px-6 shadow-sm"
              >
                <AccordionTrigger className="py-5 text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="pb-5 leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-primary py-20 text-center text-primary-foreground sm:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Still have a question?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/80">
            Contact FutureCents and tell us what your business needs help with.
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
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        })}
      </script>

      <Footer />
    </main>
  );
}