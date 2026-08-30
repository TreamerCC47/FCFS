import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const expectations = [
  {
    title: "Clear communication",
    description:
      "We explain the numbers and next steps in straightforward language, without unnecessary jargon.",
  },
  {
    title: "Organised financial work",
    description:
      "Keep your bookkeeping, tax, payroll, and supporting documents moving in the right direction.",
  },
  {
    title: "Support that fits your business",
    description:
      "Start with the services you need and build a practical support plan as your business grows.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
            What to expect
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Practical support for the work behind your numbers.
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            FutureCents helps small-business owners stay informed, organised,
            and ready for the next decision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {expectations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border"
            >
              <CheckCircle2 className="w-8 h-8 text-primary mb-6" />

              <h4 className="text-xl font-bold text-foreground mb-3">
                {item.title}
              </h4>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}