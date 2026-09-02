import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { X } from "lucide-react";

type LegalDocument = "terms" | "privacy" | "popia";

const legalDocuments: Record<
  LegalDocument,
  {
    label: string;
    title: string;
    description: string;
    sections: { heading: string; body: string }[];
  }
> = {
  terms: {
    label: "Terms & Conditions",
    title: "Terms & Conditions",
    description: "The terms that guide our accounting, tax, and business advisory services.",
    sections: [
      {
        heading: "Our services",
        body: "FutureCents provides accounting, bookkeeping, tax, payroll, compliance, and advisory services as agreed with each client. The exact services, timelines, and deliverables will be confirmed in writing before work begins.",
      },
      {
        heading: "Fees and payment",
        body: "Monthly retainers are billed in advance. Once-off work may require a deposit before commencement. Any work outside the agreed scope will be discussed and quoted before it is started.",
      },
      {
        heading: "Your responsibilities",
        body: "Clients are responsible for providing complete, accurate, and timely information and for reviewing documents or advice supplied by FutureCents. Delays or inaccuracies in client information may affect deadlines and outcomes.",
      },
      {
        heading: "Confidentiality",
        body: "We treat client financial and business information as confidential and only use it to provide the agreed services, meet legal obligations, or protect our legitimate business interests.",
      },
      {
        heading: "Important note",
        body: "This website provides general information and is not legal, tax, or financial advice. These website terms should be reviewed and customised by a qualified South African legal professional before publication.",
      },
    ],
  },
  privacy: {
    label: "Privacy Policy",
    title: "Privacy Policy",
    description: "How FutureCents handles information shared through this website.",
    sections: [
      {
        heading: "Information we collect",
        body: "If you contact us, we may collect your name, email address, business or industry details, and the message you send. We may also receive basic technical information needed to keep the website secure and working properly.",
      },
      {
        heading: "How we use information",
        body: "We use contact information to respond to enquiries, assess whether our services may help, communicate with prospective clients, and provide requested services. We do not sell personal information.",
      },
      {
        heading: "Sharing and retention",
        body: "We may share information with trusted service providers who help us operate our business, subject to appropriate confidentiality and security requirements. We keep information only for as long as reasonably necessary for the purpose collected or as required by law.",
      },
      {
        heading: "Your choices",
        body: "You may ask us to access, correct, update, or delete personal information we hold about you, subject to applicable legal requirements. You may also ask us to stop using your information for direct marketing.",
      },
      {
        heading: "Contact",
        body: "For privacy questions or requests, contact enquiries@futurecents.co.za. This draft policy should be reviewed and updated to reflect the final tools, providers, retention periods, and business processes used by FutureCents.",
      },
    ],
  },
  popia: {
    label: "Privacy & POPIA",
    title: "Privacy & POPIA",
    description: "Our approach to responsible processing of personal information under South Africa's POPIA framework.",
    sections: [
      {
        heading: "Responsible processing",
        body: "FutureCents aims to process personal information lawfully, fairly, and transparently, and only for specific purposes connected to our services and business operations.",
      },
      {
        heading: "Security safeguards",
        body: "We take reasonable technical and organisational measures to protect personal information against loss, misuse, unauthorised access, disclosure, alteration, or destruction.",
      },
      {
        heading: "Data subject rights",
        body: "Subject to POPIA and other applicable law, you may request access to or correction of your personal information, object to certain processing, and ask for deletion where there is no lawful reason to retain it.",
      },
      {
        heading: "Direct marketing",
        body: "We will respect applicable consent and opt-out requirements for electronic direct marketing. You can ask us to stop sending marketing communications at any time.",
      },
      {
        heading: "Questions and complaints",
        body: "Please contact enquiries@futurecents.co.za first so we can try to resolve your concern. You may also contact the South African Information Regulator where you believe your personal information rights have not been respected.",
      },
    ],
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeDocument, setActiveDocument] = useState<LegalDocument | null>(null);
  const activeLegalDocument = activeDocument ? legalDocuments[activeDocument] : null;
    const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeDocument) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDocument(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      previouslyFocused?.focus();
    };
  }, [activeDocument]);

  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          
          <div className="md:col-span-4 lg:col-span-5">
           <div className="flex items-center gap-3 mb-6">
  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
    <span className="text-primary-foreground font-bold text-xl leading-none">F</span>
  </div>

  <div>
    <div className="font-bold text-xl tracking-tight text-primary leading-none">
      FutureCents
    </div>
    <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mt-1">
      Accounting · Tax · Compliance
    </div>
  </div>
</div>
           <p className="text-sm text-muted-foreground max-w-sm">
  Practical accounting, tax, payroll, and business support for South African
  small businesses.
</p>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-bold text-foreground mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><button onClick={() => document.querySelector("#services")?.scrollIntoView()} className="hover:text-primary transition-colors">Monthly Bookkeeping</button></li>
              <li><button onClick={() => document.querySelector("#services")?.scrollIntoView()} className="hover:text-primary transition-colors">Tax Compliance</button></li>
              <li><button onClick={() => document.querySelector("#services")?.scrollIntoView()} className="hover:text-primary transition-colors">Payroll Administration</button></li>
              <li><button onClick={() => document.querySelector("#services")?.scrollIntoView()} className="hover:text-primary transition-colors">Annual Financial Statements</button></li>
              <li><button onClick={() => document.querySelector("#services")?.scrollIntoView()} className="hover:text-primary transition-colors">Business Advisory</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground mb-8">
              <li><button onClick={() => document.querySelector("#why-us")?.scrollIntoView()} className="hover:text-primary transition-colors">Why Choose Us</button></li>
              <li><button onClick={() => document.querySelector("#pricing")?.scrollIntoView()} className="hover:text-primary transition-colors">Pricing & Plans</button></li>
              <li><button onClick={() => document.querySelector("#contact")?.scrollIntoView()} className="hover:text-primary transition-colors">Contact Us</button></li>
            </ul>
            
           <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
  Business registration and professional membership details are available on
  request.
</p>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} FutureCents (Pty) Ltd. All rights reserved.</p>
          <div className="flex gap-4 mb-2 md:mb-0 text-xs">
            {(Object.keys(legalDocuments) as LegalDocument[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveDocument(key)}
                className="hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                {legalDocuments[key].label}
              </button>
            ))}
          </div>
          <p className="font-medium text-foreground">Built for South African SMEs</p>
        </div>
      </div>

      {activeLegalDocument && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveDocument(null);
          }}
        >
                    <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-2xl outline-none sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-document-title"
          >
            <button
              type="button"
              onClick={() => setActiveDocument(null)}
              className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close information"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="pr-8">
              <h2 id="legal-document-title" className="text-2xl font-bold text-primary">
                {activeLegalDocument.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {activeLegalDocument.description}
              </p>
            </div>
            <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              {activeLegalDocument.sections.map((section) => (
                <section key={section.heading}>
                  <h3 className="mb-1 font-bold text-foreground">{section.heading}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
