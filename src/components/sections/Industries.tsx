import { motion } from "framer-motion";
import { ShoppingCart, Hammer, Paintbrush, Heart, Laptop, Coffee, Briefcase, Globe } from "lucide-react";

const industries = [
  { name: "Retail & E-commerce", icon: ShoppingCart },
  { name: "Construction & Trades", icon: Hammer },
  { name: "Creative & Media", icon: Paintbrush },
  { name: "Healthcare & Wellness", icon: Heart },
  { name: "Tech & Software", icon: Laptop },
  { name: "Hospitality & Food", icon: Coffee },
  { name: "Professional Services", icon: Briefcase },
  { name: "Non-Profit & NGO", icon: Globe },
];

export function Industries() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-12">We serve businesses across every industry</h3>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-10">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-white shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group cursor-default"
            >
              <ind.icon className="w-4 h-4 text-primary group-hover:text-secondary transition-colors" />
              <span className="font-semibold text-sm">{ind.name}</span>
            </motion.div>
          ))}
        </div>
        
        <p className="text-muted-foreground text-sm max-w-md mx-auto italic">
          Don't see your industry? Every business is welcome. We adapt to you.
        </p>
      </div>
    </section>
  );
}
