
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle2, Activity, Users, PiggyBank, FileCheck, ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-background pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[100px] pointer-events-none" />
      
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #14523e 1px, transparent 1px), linear-gradient(to bottom, #14523e 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div 
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-primary font-medium text-sm mb-6 relative">
              <div className="absolute inset-0 rounded-full border border-secondary animate-ping opacity-50"></div>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Built for South African Small Businesses
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Smart. Simple. <br />
              <span className="text-primary">Solid Finance.</span>
            </h1>
            
           <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
  Practical accounting, tax, payroll, and business support designed to keep your finances organised, your compliance on track, and your business moving forward.
</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" onClick={() => scrollToSection("#contact")} className="gap-2 text-base h-14">
                Get a free consultation <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("#services")} className="h-14 text-base bg-background/50 backdrop-blur border-border hover:bg-background">
                View Services
              </Button>
            </div>

            <div className="mb-10">
              <p className="text-sm font-medium text-muted-foreground mb-4">Trusted by SA businesses in:</p>
              <div className="flex flex-wrap gap-2">
                {["Retail", "Construction", "Tech", "Creative"].map((industry) => (
                  <span key={industry} className="px-3 py-1 bg-white border border-border rounded-full text-xs font-semibold text-foreground shadow-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div 
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-border p-6 pt-8 max-w-lg mx-auto">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
              
              <div className="flex justify-between items-center mb-8">
                <div>
                 <h3 className="text-xl font-bold text-foreground">Your Finances, Simplified</h3>
<p className="text-sm text-muted-foreground">Clear financial support for your business</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
               {[
  { label: "Bookkeeping", value: "Monthly", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Tax Support", value: "Expert", icon: PiggyBank, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Compliance", value: "On Track", icon: FileCheck, color: "text-primary", bg: "bg-primary/10" }
].map((stat, i) => (
                  <div 
                    key={i}
                    className="bg-background rounded-lg p-3 border border-border/50 flex flex-col items-center text-center shadow-sm"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${stat.bg}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className="font-bold text-foreground text-lg">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-background rounded-xl p-4 border border-border/50 relative h-48 flex items-end">
                <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,150 L0,100 C50,100 80,120 120,90 C160,60 200,80 250,50 C300,20 350,60 400,30 L400,150 Z" 
                    fill="url(#chartGrad)"
                  />
                  <path 
                    d="M0,100 C50,100 80,120 120,90 C160,60 200,80 250,50 C300,20 350,60 400,30" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="3"
                  />
                </svg>
              </div>

              <div 
                
                className="absolute top-1/2 -right-8 bg-white p-3 rounded-lg shadow-xl border border-border flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm font-bold text-foreground">Your finances, under control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
       
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
        <div 
         
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
