import { motion } from "framer-motion";
import { Phone, Search, FileText, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Send a Short Enquiry",
description: "Tell us what your business needs help with. We’ll recommend the next step."
  },
  {
    icon: Search,
    title: "We Assess Your Needs",
    description: "We review your current compliance status and identify gaps."
  },
  {
    icon: FileText,
    title: "Receive Your Proposal",
    description: "Custom package tailored to your business size and complexity within 24 hours."
  },
  {
    icon: ShieldCheck,
    title: "Onboard & Relax",
    description: "We take it from here. Your accounts, deadlines, and reports are handled."
  }
];

export function Process() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">From stress to sorted in 4 steps</h3>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border z-0">
            <motion.div 
              className="h-full bg-secondary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Connecting line mobile */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute top-24 bottom-[-48px] left-1/2 w-0.5 bg-border -translate-x-1/2 z-[-1]" />
                )}
                
                <div className="w-24 h-24 rounded-full bg-white border-4 border-background shadow-xl flex items-center justify-center mb-6 relative group transition-transform hover:scale-105">
                  <div className="absolute inset-0 rounded-full bg-secondary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <step.icon className="w-8 h-8 text-primary relative z-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center text-sm shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
