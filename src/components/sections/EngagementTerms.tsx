import { motion } from "framer-motion";
import { CheckCircle2, Shield, Calendar, RefreshCcw, Zap, Phone, Search, FileText } from "lucide-react";

const terms = [
  {
    icon: Calendar,
    title: "Predictable Billing",
    description: "Monthly retainers are billed in advance on the 1st of every month. Once-off services require a 50% deposit before commencement."
  },
  {
    icon: Shield,
    title: "Strict Confidentiality",
    description: "Your financial data is protected. We use industry-standard secure portals for document sharing and never disclose your information."
  },
  {
    icon: FileText,
    title: "Clear Boundaries",
    description: "Our scope of work is defined upfront. If you need out-of-scope work, we'll quote you first so there are no surprise invoices."
  },
  {
    icon: RefreshCcw,
    title: "No Lock-ins",
    description: "We earn your business every month. If you need to cancel or pause your retainer, we simply require 30 days' written notice."
  },
  {
    icon: Zap,
    title: "Onboarding in 48 Hours",
    description: "After signing, we set up your profile and connect all accounts within 2 business days. We move fast so you can too."
  }
];

export function EngagementTerms() {
  return (
    <section className="py-24 bg-white border-y border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">How We Work</h2>
          <h3 className="text-3xl font-bold text-foreground mb-4">Clean terms. Good business.</h3>
          <p className="text-muted-foreground">
            We believe in setting clear expectations from day one. Our engagement terms are designed to protect both parties and foster a long-term partnership.
          </p>
        </div>

        {/* Stepper Timeline */}
        <div className="relative max-w-6xl mx-auto mb-24">
          <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-border" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {terms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-0 lg:text-center"
              >
                <div className="hidden lg:hidden absolute top-6 bottom-[-32px] left-6 w-0.5 bg-border z-[-1]" />
                
                <div className="w-12 h-12 rounded-full bg-white border-2 border-primary shadow-sm flex items-center justify-center shrink-0 lg:mb-6 z-10 relative">
                  <term.icon className="w-5 h-5 text-primary" />
                </div>
                
                <div className="pt-2 lg:pt-0">
                  <div className="text-xs font-extrabold text-secondary mb-1 tracking-widest">TERM {index + 1}</div>
                  <h4 className="text-[15px] font-bold text-foreground mb-2 leading-tight">{term.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed lg:px-2">
                    {term.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What happens next flow */}
        <div className="max-w-4xl mx-auto bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm">
          <h4 className="text-2xl font-bold text-center mb-10 text-foreground">What happens next?</h4>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-border">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Step 1</span>
              <span className="text-sm font-bold text-foreground">Book a call</span>
            </div>
            
            <div className="h-8 w-0.5 md:w-16 md:h-0.5 bg-border shrink-0" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-border">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Step 2</span>
              <span className="text-sm font-bold text-foreground">We assess needs</span>
            </div>
            
            <div className="h-8 w-0.5 md:w-16 md:h-0.5 bg-border shrink-0" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-border">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Step 3</span>
              <span className="text-sm font-bold text-foreground">Custom proposal</span>
            </div>
            
            <div className="h-8 w-0.5 md:w-16 md:h-0.5 bg-border shrink-0" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 shadow-sm border border-secondary/30">
                <CheckCircle2 className="w-7 h-7 text-secondary" />
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Step 4</span>
              <span className="text-sm font-bold text-foreground">Sign & onboard</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
