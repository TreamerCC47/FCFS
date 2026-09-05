import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Menu, MessageSquare, X } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-10% 0px -50% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Guides", href: "/guides" },
  { name: "Pricing", href: "#pricing" },
  { name: "How it works", href: "#how-it-works" },
  { name: "FAQs", href: "/faq" },
];

const scrollToSection = (href: string) => {
  setMobileMenuOpen(false);

  if (href.startsWith("/")) {
    window.location.assign(href);
    return;
  }

  const element = document.querySelector(href);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/95 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-3 sm:py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <img
  src="/FC_Header_logo.svg"
  alt="FutureCents Accounting, Tax, Compliance"
  className="block h-auto w-[240px] max-w-none shrink-0 sm:w-[415px]"
/>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className={`relative py-2 text-sm font-semibold transition-colors ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}

                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-secondary" />
                )}
              </button>
            ))}

            <Link
              href="/pay"
              className="py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Pay an invoice
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="gap-2 border-[#25D366] text-[#188a43] hover:bg-[#25D366]/10 hover:text-[#188a43]"
            >
              <a
                href="https://wa.me/27816733268"
                target="_blank"
                rel="noreferrer"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>

            <Button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="gap-2"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-foreground transition-colors hover:bg-primary/10 md:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {mobileMenuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-full flex w-full flex-col gap-3 border-b border-border bg-background px-6 py-5 shadow-lg md:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => scrollToSection(link.href)}
              className={`border-l-2 py-2 pl-3 text-left text-base font-semibold ${
                activeSection === link.href
                  ? "border-secondary text-primary"
                  : "border-transparent text-foreground"
              }`}
            >
              {link.name}
            </button>
          ))}

          <Link
            href="/pay"
            onClick={() => setMobileMenuOpen(false)}
            className="border-l-2 border-transparent py-2 pl-3 text-base font-semibold text-foreground"
          >
            Pay an invoice
          </Link>

          <div className="mt-2 grid gap-3 border-t border-border pt-4">
            <Button
              asChild
              variant="outline"
              className="h-12 w-full gap-2 border-[#25D366] text-[#188a43] hover:bg-[#25D366]/10 hover:text-[#188a43]"
            >
              <a
                href="https://wa.me/27816733268"
                target="_blank"
                rel="noreferrer"
              >
                <MessageSquare className="h-4 w-3" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="h-12 w-full gap-2"
            >
              Get a quote
              <ArrowRight className="h-4 w-3" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}