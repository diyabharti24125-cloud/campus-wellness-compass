import { ExternalLink, Heart } from "lucide-react";

const year = new Date().getFullYear();
const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
  typeof window !== "undefined" ? window.location.hostname : "campuswellness",
)}`;

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

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 max-w-6xl py-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-foreground/15 rounded-xl flex items-center justify-center">
              <Heart
                className="w-4 h-4 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <div>
              <p className="font-display font-bold text-primary-foreground text-base leading-tight">
                Campus Wellness Compass
              </p>
              <p className="text-primary-foreground/60 text-xs">
                Health simplified for students
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-primary-foreground/75 hover:text-primary-foreground text-sm font-medium transition-smooth"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/15 mb-6" />

        {/* Credits */}
        <div className="text-center space-y-3">
          <p className="text-primary-foreground/85 text-sm font-medium">
            Developed by :{" "}
            <strong className="text-primary-foreground">Diya</strong> ,
            <strong className="text-primary-foreground">Vaishali</strong>,{" "}
            <strong className="text-primary-foreground">Saumya</strong> | BCA
            Semester 4 Project
          </p>

          <p className="text-primary-foreground/65 text-xs max-w-2xl mx-auto leading-relaxed font-semibold">
            ⚠️ Disclaimer: This is a student project for educational purposes
            only. For medical emergencies, consult a professional doctor or dial
            112 immediately.
          </p>

          <p className="text-primary-foreground/50 text-xs">
            © {year}. Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground underline underline-offset-2 transition-smooth inline-flex items-center gap-0.5"
            >
              caffeine.ai
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
