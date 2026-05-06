import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EmergencyContact } from "@/types";
import { AlertTriangle, MapPin, Phone } from "lucide-react";

const contacts: EmergencyContact[] = [
  {
    id: "national",
    name: "National Emergency",
    number: "112",
    description: "All-India emergency helpline — police, fire, medical",
  },
  {
    id: "ambulance",
    name: "Ambulance Service",
    number: "102",
    description:
      "Free government ambulance service, available 24/7 across India",
  },
  {
    id: "infirmary",
    name: "College Infirmary",
    number: "+91-11-4567-8900",
    description:
      "On-campus health center — first aid, consultation & referrals",
  },
];

export function EmergencySOS() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number.replace(/\s/g, "")}`;
  };

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/search/hospital+near+me/@28.6139,77.2090,13z",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section id="emergency-sos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 mb-4">
            🚨 Emergency
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Emergency SOS & Local Directory
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tap to call emergency services instantly. New Delhi, India — contact
            your nearest Medical Store or Chemist for non-emergency needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact cards */}
          <div className="space-y-4" data-ocid="emergency_sos.list">
            {contacts.map((contact, i) => (
              <div
                key={contact.id}
                className="bg-card border border-border rounded-2xl p-5 shadow-card flex items-center gap-5 hover:shadow-sos transition-smooth"
                data-ocid={`emergency_sos.item.${i + 1}`}
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-base truncate">
                    {contact.name}
                  </h3>
                  <p className="text-primary font-bold text-lg leading-tight">
                    {contact.number}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5 leading-snug line-clamp-2">
                    {contact.description}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => handleCall(contact.number)}
                  className="flex-shrink-0 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl px-4 h-10 font-semibold text-sm shadow-sos transition-smooth hover:scale-105"
                  data-ocid={`emergency_sos.call_button.${i + 1}`}
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  Call Now
                </Button>
              </div>
            ))}

            {/* India-specific labels note */}
            <div className="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 flex gap-3 items-start">
              <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/75 leading-relaxed">
                Look for{" "}
                <strong className="text-foreground">Medical Store</strong> or{" "}
                <strong className="text-foreground">Chemist</strong> signs for
                over-the-counter medicines and first-aid supplies near your
                campus.
              </p>
            </div>
          </div>

          {/* Map placeholder — Google Maps centered on New Delhi */}
          <div className="rounded-2xl overflow-hidden shadow-card border border-border">
            <div className="teal-gradient px-5 py-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground font-semibold text-sm">
                New Delhi, India — Nearby Medical Facilities
              </span>
            </div>
            <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
              <iframe
                title="New Delhi medical facilities map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8398787693!2d77.06889754516808!3d28.52755940305563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1714141234567!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="px-5 py-3 bg-muted/40 border-t border-border">
              <button
                type="button"
                onClick={openMap}
                className="text-primary text-sm font-semibold hover:underline flex items-center gap-1.5 transition-smooth"
                data-ocid="emergency_sos.open_map_button"
              >
                <MapPin className="w-3.5 h-3.5" />
                Find nearest hospital or chemist on Google Maps →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
