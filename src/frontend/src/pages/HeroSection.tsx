import { Button } from "@/components/ui/button";
import { ArrowDown, BookOpen, Shield, Stethoscope } from "lucide-react";

const features = [
  { icon: Stethoscope, label: "Symptom Guide" },
  { icon: Shield, label: "Emergency SOS" },
  { icon: BookOpen, label: "Wellness Quiz" },
];

export function HeroSection() {
  const scrollToSymptoms = () => {
    document
      .querySelector("#symptom-guide")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative hero-gradient text-primary-foreground overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl py-20 md:py-28 relative z-10">
        <div className="max-w-2xl animate-slide-up">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-primary-foreground/15 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-primary-foreground/20">
            🏥 Campus Health Resource — India
          </span>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Your Health, <span className="opacity-90">Simplified for</span>{" "}
            Campus Life.
          </h1>

          <p className="text-primary-foreground/85 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Quick first-aid guidance, health tracking, and local medical
            resources designed for students across India.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              type="button"
              onClick={scrollToSymptoms}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3 rounded-xl text-base shadow-elevated transition-smooth hover:scale-105 h-auto"
              data-ocid="hero.get_started_button"
            >
              Get Started
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
            <span className="text-primary-foreground/70 text-sm">
              Free · No login required · Student-friendly
            </span>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-3 py-2 text-sm font-medium"
              >
                <Icon className="w-4 h-4 opacity-80" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-12 fill-background"
        >
          <title>Decorative wave divider</title>
          <path d="M0,60 C300,0 900,60 1200,20 L1200,60 Z" />
        </svg>
      </div>
    </section>
  );
}
