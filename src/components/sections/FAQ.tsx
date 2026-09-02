import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const faqs = [
  { q: "Do I need to be VAT registered to use FutureCents?", a: "No. We work with both VAT-registered and non-VAT businesses. If you're approaching the R1 million threshold, we'll guide you through voluntary registration." },
  { q: "What documents do I need to get started?", a: "Typically your company registration documents, recent bank statements (3 months), and any existing SARS correspondence. We'll send you a full checklist after your onboarding call." },
  { q: "Can you help if my books are behind?", a: "Yes. Backlog catch-ups are one of our most requested once-off services. We'll quote you based on how far behind you are and get you compliant before taking on a monthly retainer." },
  { q: "How does the monthly retainer billing work?", a: "Retainers are invoiced on the 1st of each month in advance via EFT or debit order. Once-off services require a 50% deposit before we begin." },
  { q: "What happens if SARS contacts me directly?", a: "All SARS correspondence should be forwarded to us immediately." },
  { q: "Is my financial information secure?", a: "We take reasonable technical and organisational steps to protect the personal information shared with us." },
  { q: "Do you work with businesses outside South Africa?", a: "We primarily serve South African-registered entities. If you have foreign operations or offshore income, contact us and we'll assess whether we can assist." },
  { q: "How quickly can you start?", a: "Typically within 48 hours of signing our engagement letter. We'll set up your client portal, collect your documents, and have your first monthly cycle covered." },
];

export function FAQ() {thre
  return (
    <section className="py-24 bg-white border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Common Questions</h2>
          <h3 className="text-3xl font-bold text-foreground mb-4">Everything you need to know.</h3>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-8 gap-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.slice(0, 4).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 data-[state=open]:border-l-4 data-[state=open]:border-l-secondary bg-background shadow-sm transition-all border-b-0">
                <AccordionTrigger className="text-left font-semibold text-[15px] hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.slice(4).map((faq, index) => (
              <AccordionItem key={index + 4} value={`item-${index + 4}`} className="border rounded-lg px-6 data-[state=open]:border-l-4 data-[state=open]:border-l-secondary bg-background shadow-sm transition-all border-b-0">
                <AccordionTrigger className="text-left font-semibold text-[15px] hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
