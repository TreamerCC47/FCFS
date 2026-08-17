import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Thabo Nkosi",
    business: "Nkosi & Associates (Pty) Ltd — Sandton",
    quote: "Before FutureCents, I was paying penalties every quarter. Within three months they had my PAYE and VAT submissions on autopilot. I actually sleep at night now."
  },
  {
    name: "Priya Govender",
    business: "Spice & Thread Boutique — Durban",
    quote: "I was terrified of SARS. My FutureCents advisor explained everything in plain English and handled my backlog without judgement. Worth every rand of the retainer."
  },
  {
    name: "Daniël van Wyk",
    business: "DvW Construction CC — Stellenbosch",
    quote: "Running a CC with 8 employees means payroll, UIF, and EMP201 every month. FutureCents just handles it all. I focus on sites, they focus on compliance."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Client Success</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Don't just take our word for it.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border relative overflow-hidden"
            >
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-secondary/10 rotate-12" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              
              <p className="text-muted-foreground italic mb-8 relative z-10 leading-relaxed text-sm md:text-base">
                "{t.quote}"
              </p>
              
              <div className="relative z-10">
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-primary font-medium mt-1">{t.business}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground/60 max-w-xl mx-auto">
          Results from real clients. Names used with permission.
        </p>
      </div>
    </section>
  );
}
