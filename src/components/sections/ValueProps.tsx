import { motion } from "framer-motion";
import { ShieldCheck, LineChart, MessageCircle, PiggyBank } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Stay on top of compliance",
    description:
      "We help you understand what needs to be done, when it needs to be done, and what information is required.",
    takeaway: "Clear deadlines and next steps",
  },
  {
    icon: LineChart,
    title: "Understand your numbers",
    description:
      "Your financial reports should help you make decisions. We explain the important points without unnecessary jargon.",
    takeaway: "Reports you can actually use",
  },
  {
    icon: MessageCircle,
    title: "Speak to a real person",
    description:
      "When a deadline or financial question needs attention, you can reach us directly through WhatsApp.",
    takeaway: "Practical support when you need it",
  },
  {
    icon: PiggyBank,
    title: "Support that grows with you",
    description:
      "Start with the work your business needs today and build a more complete support structure as you grow.",
    takeaway: "Flexible support for growing businesses",
  }
];

export function ValueProps() {
  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 1px, transparent 20px)`
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          <div className="hidden lg:flex justify-center items-center relative h-full min-h-[400px]">
            <motion.div 
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute w-64 h-64 bg-primary rounded-3xl -rotate-6 opacity-10"
            />
            <motion.div 
              initial={{ opacity: 0, rotate: 10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-64 h-64 bg-secondary rounded-full rotate-12 opacity-20 translate-x-12 translate-y-12"
            />
            <div className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-2xl border border-border shadow-xl text-center max-w-sm">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Finance doesn't have to be intimidating.</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                FutureCents is built for owner-managed businesses that want their financial work handled carefully, explained clearly, and shaped around the way they operate.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-12 lg:hidden text-center">
              <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Why FutureCents</h2>
              <h3 className="text-3xl font-bold text-foreground mb-4">A finance partner who keeps things clear.</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/0 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300 relative z-10 shadow-sm">
                    <pillar.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2 relative z-10">{pillar.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4 relative z-10">
                    {pillar.description}
                  </p>
                  <p className="text-secondary font-semibold italic text-xs relative z-10 bg-secondary/10 inline-block px-2 py-1 rounded">
                    {pillar.takeaway}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
