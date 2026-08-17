import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring } from "framer-motion";

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const [display, setDisplay] = useState(prefix + "0" + suffix);
  
  useEffect(() => {
    return springValue.on("change", (latest) => {
      const formatted = latest % 1 !== 0 ? latest.toFixed(1) : Math.floor(latest).toString();
      setDisplay(prefix + formatted + suffix);
    });
  }, [springValue, prefix, suffix]);

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  return <span ref={ref}>{display}</span>;
}

export function StatsBar() {
  return (
    <section className="w-full bg-primary text-primary-foreground py-16 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
          <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-secondary">
              <AnimatedNumber value={150} suffix="+" />
            </div>
            <div className="text-xs md:text-sm font-medium uppercase tracking-wider opacity-80 text-center">Businesses served</div>
          </div>
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-secondary">
              <AnimatedNumber value={4.8} prefix="R" suffix="M+" />
            </div>
            <div className="text-xs md:text-sm font-medium uppercase tracking-wider opacity-80 text-center">Client tax savings</div>
          </div>
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-secondary">
              <AnimatedNumber value={100} suffix="%" />
            </div>
            <div className="text-xs md:text-sm font-medium uppercase tracking-wider opacity-80 text-center">SARS submission rate</div>
          </div>
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-secondary">
              <AnimatedNumber value={48} suffix="hr" />
            </div>
            <div className="text-xs md:text-sm font-medium uppercase tracking-wider opacity-80 text-center">Avg onboarding time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
