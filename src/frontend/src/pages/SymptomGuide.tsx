import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SymptomCard } from "@/types";
import { AlertCircle, CheckCircle, MapPin, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const symptoms: SymptomCard[] = [
  {
    id: "exam-stress",
    title: "Exam Stress",
    icon: "🧠",
    description:
      "Mental strain from academic pressure, deadlines, and performance anxiety common during exams.",
    color: "border-l-primary",
    firstAidSteps: [
      "Take 5 slow, deep breaths — inhale for 4 counts, hold for 4, exhale for 6.",
      "Step away from study material for 10 minutes; walk or stretch lightly.",
      "Drink a glass of water and eat something light — avoid excessive caffeine.",
    ],
    whenToSeeDoctor: [
      "Persistent chest tightness or rapid heartbeat lasting over 30 minutes",
      "Inability to sleep for 3+ consecutive nights",
      "Feelings of hopelessness or panic attacks that do not subside",
      "Physical symptoms like nausea or severe headaches during stress",
    ],
  },
  {
    id: "dehydration",
    title: "Dehydration",
    icon: "💧",
    description:
      "Loss of fluids causing fatigue, dizziness, and reduced concentration in students.",
    color: "border-l-primary",
    firstAidSteps: [
      "Drink 2–3 glasses of water slowly over 15 minutes — do not gulp rapidly.",
      "Add a pinch of salt and sugar to water (ORS) to replenish electrolytes.",
      "Rest in a cool, shaded area and avoid direct sunlight until feeling better.",
    ],
    whenToSeeDoctor: [
      "No urination for 8+ hours or very dark yellow urine",
      "Severe dizziness, confusion, or difficulty standing",
      "Rapid heartbeat combined with sunken eyes or dry mouth",
      "Unable to retain any fluids due to vomiting",
    ],
  },
  {
    id: "migraine",
    title: "Migraine",
    icon: "🤕",
    description:
      "Intense throbbing headaches often with light sensitivity, affecting study and concentration.",
    color: "border-l-primary/60",
    firstAidSteps: [
      "Move to a quiet, dark room immediately and lie down with eyes closed.",
      "Apply a cold or warm compress to forehead or back of neck for relief.",
      "Drink water, take an OTC pain reliever (if prescribed), and avoid screens.",
    ],
    whenToSeeDoctor: [
      "Headache is the 'worst of your life' or came on suddenly like a thunderclap",
      "Accompanied by fever, stiff neck, or vision changes",
      "Migraines occurring more than 4 times per month",
      "Pain that is not relieved after 24 hours with standard care",
    ],
  },
  {
    id: "flu",
    title: "Flu",
    icon: "🤧",
    description:
      "Influenza symptoms including fever, body aches, and fatigue spreading in campus environments.",
    color: "border-l-destructive",
    firstAidSteps: [
      "Rest completely — avoid attending classes to prevent spreading to others.",
      "Stay hydrated with warm water, herbal tea, or warm soups every 2 hours.",
      "Monitor your temperature; take paracetamol if fever exceeds 38.5°C.",
    ],
    whenToSeeDoctor: [
      "High fever (above 39.4°C) that does not break after 3 days",
      "Difficulty breathing or shortness of breath",
      "Chest pain or persistent pressure in the chest",
      "Symptoms that improve then return with fever and worsening cough",
    ],
  },
  {
    id: "homesickness",
    title: "Homesickness & Loneliness",
    icon: "🏠",
    description:
      "Feeling far from home? You're not alone. Adjusting to campus life takes time — and support.",
    color: "border-l-[oklch(0.55_0.14_290)]",
    firstAidSteps: [
      "Build a daily routine — morning walk, meal times, study schedule.",
      "Join at least one campus club or sports team this week.",
      "Schedule a weekly video call with family or close friends.",
      "Explore your campus — find a favorite spot (library, cafe, garden).",
      "Introduce yourself to one new classmate today.",
    ],
    whenToSeeDoctor: [
      "If feelings of loneliness persist for more than 2 weeks, visit your college counselor.",
    ],
  },
  {
    id: "anxiety-burnout",
    title: "Anxiety & Burnout",
    icon: "🧘",
    description:
      "Feeling overwhelmed? Persistent stress and exhaustion can affect both mind and body.",
    color: "border-l-[oklch(0.5_0.16_260)]",
    firstAidSteps: [
      "Try the Box Breathing exercise (4 rounds) — see below.",
      "Write down your top 3 tasks — ignore the rest for now.",
      "Take a 10-minute walk outside — no phone.",
      "Talk to a friend or college counselor about academic pressure.",
      "Remember: grades don't define your worth.",
    ],
    whenToSeeDoctor: [
      "If anxiety is affecting your daily life or sleep, consult your college's mental health counselor.",
      "You can also call iCall: 9152987821 for free, confidential student support.",
    ],
  },
];

// Box breathing animation phases
const BREATH_PHASES = [
  { label: "Inhale", duration: 4, color: "oklch(0.54 0.12 185)" },
  { label: "Hold", duration: 4, color: "oklch(0.4 0.1 185)" },
  { label: "Exhale", duration: 4, color: "oklch(0.62 0.14 150)" },
  { label: "Hold", duration: 4, color: "oklch(0.5 0.08 185)" },
];

function BoxBreathingGuide() {
  const [active, setActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [counter, setCounter] = useState(4);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef({ phaseIdx: 0, counter: 4 });

  const phase = BREATH_PHASES[phaseIdx];

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    stateRef.current = { phaseIdx: 0, counter: 4 };
    setActive(false);
    setPhaseIdx(0);
    setCounter(4);
  };

  const start = () => {
    stateRef.current = { phaseIdx: 0, counter: 4 };
    setPhaseIdx(0);
    setCounter(4);
    setActive(true);
  };

  useEffect(() => {
    if (!active) return;
    intervalRef.current = setInterval(() => {
      stateRef.current.counter -= 1;
      if (stateRef.current.counter <= 0) {
        stateRef.current.phaseIdx =
          (stateRef.current.phaseIdx + 1) % BREATH_PHASES.length;
        stateRef.current.counter =
          BREATH_PHASES[stateRef.current.phaseIdx].duration;
      }
      setPhaseIdx(stateRef.current.phaseIdx);
      setCounter(stateRef.current.counter);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const circleSize = active
    ? phase.label === "Inhale"
      ? "scale-[1.45]"
      : phase.label === "Exhale"
        ? "scale-[0.75]"
        : "scale-[1.1]"
    : "scale-100";

  return (
    <div className="bg-muted/40 rounded-xl p-4 border border-border">
      <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3 text-sm">
        <Wind className="w-4 h-4 text-primary" />
        Box Breathing Exercise
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        Inhale 4s → Hold 4s → Exhale 4s → Hold 4s — repeat 4 rounds to reset
        your nervous system.
      </p>

      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          {/* Animated circle */}
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm transition-transform duration-1000 ease-in-out ${circleSize}`}
            style={{
              background: active ? phase.color : "oklch(0.54 0.12 185)",
            }}
          >
            {active ? counter : "·"}
          </div>
        </div>

        {active && (
          <p className="text-sm font-semibold text-foreground tracking-wide">
            {phase.label}
          </p>
        )}

        <Button
          type="button"
          size="sm"
          onClick={active ? stop : start}
          className={`rounded-xl px-6 font-semibold transition-smooth ${
            active
              ? "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          data-ocid="symptom_guide.breathe_button"
        >
          {active ? "Stop" : "Start Breathing"}
        </Button>
      </div>
    </div>
  );
}

export function SymptomGuide() {
  const [selected, setSelected] = useState<SymptomCard | null>(null);

  const findChemist = () => {
    window.open(
      "https://www.google.com/maps/search/medical+store+chemist+near+me",
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Color accent for new mental health cards
  const cardAccentClass = (id: string) => {
    if (id === "homesickness") return "border-l-violet-400";
    if (id === "anxiety-burnout") return "border-l-indigo-400";
    return "";
  };

  return (
    <section id="symptom-guide" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            🩺 Support & Wellness
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Expanded Support Guide
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Mental & physical wellness support for campus life. Select a card to
            get immediate guidance, breathing exercises, and when to seek help.
          </p>
        </div>

        {/* 3-column grid: desktop | 2-col: tablet | 1-col: mobile */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="symptom_guide.list"
        >
          {symptoms.map((symptom, i) => {
            const isNew =
              symptom.id === "homesickness" || symptom.id === "anxiety-burnout";
            return (
              <button
                key={symptom.id}
                type="button"
                onClick={() => setSelected(symptom)}
                className={`group text-left bg-card rounded-2xl p-6 shadow-card border border-border border-l-4 ${
                  isNew ? cardAccentClass(symptom.id) : symptom.color
                } card-hover`}
                data-ocid={`symptom_guide.item.${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl leading-none">{symptom.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">
                      {symptom.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {symptom.description}
                    </p>
                    {isNew && (
                      <Badge className="mt-3 text-xs bg-primary/10 text-primary border-primary/20">
                        Mental Health
                      </Badge>
                    )}
                    <span className="inline-flex items-center gap-1.5 mt-4 text-primary text-sm font-semibold group-hover:gap-2.5 transition-smooth">
                      Learn More <span className="text-base">→</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          className="max-w-lg rounded-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="symptom_guide.dialog"
        >
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 font-display text-xl">
                  <span className="text-3xl">{selected.icon}</span>
                  {selected.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Box breathing for anxiety card */}
                {selected.id === "anxiety-burnout" && <BoxBreathingGuide />}

                {/* First aid */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Immediate First-Aid Steps
                  </h4>
                  <ol className="space-y-2">
                    {selected.firstAidSteps.map((step, i) => (
                      <li
                        key={step.slice(0, 30)}
                        className="flex gap-3 text-sm text-foreground/85"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* When to see doctor */}
                <div className="bg-destructive/5 border border-destructive/15 rounded-xl p-4">
                  <h4 className="flex items-center gap-2 font-semibold text-destructive mb-3 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    When to Seek Help
                  </h4>
                  <ul className="space-y-1.5">
                    {selected.whenToSeeDoctor.map((item) => (
                      <li
                        key={item.slice(0, 30)}
                        className="flex gap-2 text-sm text-foreground/80"
                      >
                        <span className="text-destructive mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  type="button"
                  onClick={findChemist}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold transition-smooth"
                  data-ocid="symptom_guide.find_chemist_button"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Nearest Chemist / Medical Store
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
