import { motion } from "framer-motion";
import { ShieldCheck, LineChart, MessageCircle, PiggyBank } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Proactive Compliance",
    description: "No more last-minute scrambles. We stay ahead of SARS deadlines so you never face penalties.",
    proof: "Avg 14 days ahead of SARS deadlines"
  },
  {
    icon: LineChart,
    title: "Clear Reporting",
    description: "Financial statements shouldn't need a translator. We provide insights in plain language you can actually use.",
    proof: "Monthly summaries in under 3 minutes"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Direct, accessible communication. Message us when you have a question, get answers when you need them.",
    proof: "Typical response in < 2 hours"
  },
  {
    icon: PiggyBank,
    title: "SME-Focused Value",
    description: "Enterprise-grade financial expertise priced and structured specifically for South African small businesses.",
    proof: "Up to 30% savings vs traditional firms"
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
                We built FutureCents to be the partner we wished we had—approachable, organised, and deeply invested in your business's stability.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-12 lg:hidden text-center">
              <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Why FutureCents</h2>
              <h3 className="text-3xl font-bold text-foreground mb-4">Finance doesn't have to be intimidating.</h3>
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
                    "{pillar.proof}"
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
