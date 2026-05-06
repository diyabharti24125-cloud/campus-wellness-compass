import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Symptom Guide", href: "#symptom-guide" },
  { label: "Health Calculator", href: "#health-calculator" },
  { label: "Wellness Quiz", href: "#wellness-quiz" },
  { label: "Emergency SOS", href: "#emergency-sos" },
  { label: "Nutrition", href: "#nutrition-planner" },
  { label: "Medicine", href: "#medicine-reminder" },
  { label: "Sleep", href: "#sleep-optimizer" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 teal-gradient transition-smooth ${
        scrolled ? "shadow-elevated" : "shadow-subtle"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 text-primary-foreground hover:opacity-90 transition-smooth"
            data-ocid="nav.logo_link"
          >
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Heart
                className="w-4 h-4 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Campus<span className="opacity-80">Wellness</span>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-lg text-sm font-medium transition-smooth"
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground p-2 rounded-lg hover:bg-primary-foreground/10 transition-smooth"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            data-ocid="nav.hamburger_toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className="md:hidden pb-4 animate-slide-down"
            data-ocid="nav.mobile_menu"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 px-4 py-3 rounded-lg text-sm font-medium transition-smooth"
                    data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
