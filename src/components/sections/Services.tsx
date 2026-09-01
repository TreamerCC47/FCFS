import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calculator, Users, FileText, Lightbulb, ChevronDown, ChevronUp, CalendarDays } from "lucide-react";

const services = [
  {
  icon: BookOpen,
  title: "Monthly Bookkeeping",
  description: "Keep your business finances organised and up to date with accurate monthly bookkeeping and reconciliations.",
  includes: [
    "Bank & credit card reconciliation",
    "Income & expense recording",
    "Debtors & creditors tracking",
    "Monthly financial reports"
  ]
},
{
  icon: Calculator,
  title: "Tax Compliance",
  description: "Stay on top of your tax obligations with practical support for submissions, calculations, and SARS compliance.",
  includes: [
    "VAT calculations & submissions",
    "Provisional tax calculations",
    "Income tax return preparation",
    "SARS compliance support"
  ]
},
  {
  icon: Users,
  title: "Payroll Administration",
  description: "Reliable monthly payroll support to help you pay your employees accurately and keep your payroll records organised.",
  includes: [
    "Monthly payslip preparation",
    "EMP201 & EMP501 support",
    "UIF declaration support",
    "Leave & payroll record tracking"
  ]
},
{
  icon: FileText,
  title: "Annual Financial Statements",
  description: "Clear, professionally prepared financial statements to help you understand your business and meet your annual reporting requirements.",
  includes: [
    "Annual financial statement preparation",
    "Income statement & balance sheet",
    "Financial position & performance review",
    "Support for compliance & funding needs"
  ]
},
{
  icon: Lightbulb,
  title: "Business Advisory",
  description: "Practical financial guidance to help you understand your numbers, plan ahead, and make better business decisions.",
  includes: [
    "Cashflow forecasting",
    "Budget vs actual analysis",
    "Profitability & margin reviews",
    "Financial planning & business guidance"
  ]
}
];

export function Services() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3">
  Our Services
</h2>

<h3 className="text-3xl md:text-5xl font-bold mb-4">
  The financial work behind a healthy business.
</h3>

<p className="text-primary-foreground/80 text-lg max-w-xl">
 From keeping your records organised to helping you plan your next move, we
support the financial work that keeps your business moving.
</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
                            <div
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === index}
                aria-controls={`service-details-${index}`}
                className="bg-primary-foreground/5 border border-primary-foreground/10 h-full hover:bg-primary-foreground/10 hover:border-l-4 hover:border-l-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-all rounded-xl p-6 flex flex-col cursor-pointer"
                onClick={() => setExpandedId(expandedId === index ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setExpandedId(expandedId === index ? null : index);
                  }
                }}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 shrink-0">
                  <service.icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-xl font-bold text-primary-foreground mb-2">{service.title}</h4>
                <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-primary-foreground/10 flex items-center justify-between text-secondary text-sm font-semibold">
                  <span>What this usually covers</span>
                  {expandedId === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                <AnimatePresence>
                  {expandedId === index && (
                    <motion.div
                     id={`service-details-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="pt-4 space-y-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-primary-foreground/80">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="h-full"
          >
            <div className="bg-secondary border-none h-full flex flex-col justify-center items-center text-center p-8 rounded-xl shadow-xl">
              <h4 className="text-2xl font-bold text-secondary-foreground mb-2">Not sure what you need?</h4>
              <p className="text-secondary-foreground/80 mb-6 text-sm font-medium">Tell us where you need help and we’ll shape the right level of support around
your business.</p>
              <button 
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors w-full shadow-md"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        </div>

        {/* Compliance Calendar */}
        <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <CalendarDays className="w-64 h-64 text-primary-foreground" />
          </div>
          <h4 className="text-xl font-bold text-primary-foreground mb-8 flex items-center gap-3 relative z-10">
            <CalendarDays className="w-6 h-6 text-secondary" />
            Typical compliance cycles
          </h4>
          <p className="relative z-10 -mt-5 mb-8 max-w-2xl text-sm leading-relaxed text-primary-foreground/65">
  Filing requirements and deadlines depend on your business and tax category.
  We help you understand what applies and keep the relevant work on track.
</p>
          
          <div className="flex gap-4 pb-4 overflow-x-auto snap-x scrollbar-hide relative z-10">
            {[
  {
    m: "Every month",
    d: "01",
    t: "Bookkeeping",
    desc: "Keep your records current",
  },
  {
    m: "Every month",
    d: "PAYE",
    t: "Payroll support",
    desc: "PAYE and UIF administration",
  },
  {
    m: "Every two months",
    d: "VAT",
    t: "VAT support",
    desc: "Calculations and submissions",
  },
  {
    m: "Twice yearly",
    d: "PROV",
    t: "Provisional tax",
    desc: "Planning and submission support",
  },
  {
    m: "Annually",
    d: "YEAR",
    t: "Annual compliance",
    desc: "Year-end tax and reporting work",
  },
].map((ev, i) => (
              <div key={i} className="min-w-[200px] bg-primary-foreground/10 rounded-xl p-5 snap-start border border-primary-foreground/5 shrink-0 hover:bg-primary-foreground/20 transition-colors">
                <div className="text-secondary font-bold text-xs uppercase tracking-wider mb-2">{ev.m}</div>
                <div className="text-4xl font-extrabold text-primary-foreground mb-3">{ev.d}</div>
                <div className="font-bold text-base mb-1">{ev.t}</div>
                <div className="text-xs text-primary-foreground/60">{ev.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
