import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, { threshold: 0.2, rootMargin: "-10% 0px -50% 0px" });

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Pricing", href: "#pricing" },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg leading-none">F</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-primary">FutureCents</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-semibold transition-all relative py-1 ${
                  activeSection === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {activeSection === link.href && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary rounded-full" />
                )}
              </button>
            ))}
                        <Link
              href="/pay"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Pay Invoice
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]">
              <a href="https://wa.me/27816733268" target="_blank" rel="noreferrer">
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </Button>
            <Button onClick={() => scrollToSection("#contact")} className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
             <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
       <div
  id="mobile-navigation"
  role="region"
  aria-label="Mobile navigation"
  className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4"
>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-left py-2 text-lg font-medium ${
                activeSection === link.href ? "text-primary border-l-2 border-secondary pl-3" : "text-foreground"
              }`}
            >
              {link.name}
            </button>
          ))}
                    <Link
            href="/pay"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-left text-lg font-medium text-foreground"
          >
            Pay Invoice
          </Link>
          <Button asChild variant="outline" className="w-full mt-2 border-[#25D366] text-[#25D366]">
            <a href="https://wa.me/27816733268" target="_blank" rel="noreferrer">
              <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Us
            </a>
          </Button>
          <Button onClick={() => scrollToSection("#contact")} className="w-full">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
}
