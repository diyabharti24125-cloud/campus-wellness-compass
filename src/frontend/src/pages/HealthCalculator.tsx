import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Droplets } from "lucide-react";
import { useState } from "react";

type ActivityLevel = "low" | "medium" | "high";

const activityTips: Record<ActivityLevel, string> = {
  low: "Even with low activity, stay consistent. Drink 1 glass every 2 hours during study sessions!",
  medium:
    "Good activity level! Drink 1 glass before and after each workout. Hydrate every 2 study hours.",
  high: "Active lifestyle detected! Drink extra water during and after exercise. Never wait to feel thirsty!",
};

export function HealthCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<ActivityLevel | "">("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const w = Number.parseFloat(weight);
    if (!weight || Number.isNaN(w) || w <= 0 || w > 300) {
      setError("Please enter a valid weight between 1–300 kg.");
      return;
    }
    if (!activity) {
      setError("Please select your daily activity level.");
      return;
    }
    const intake = w * 0.033;
    setResult(Math.round(intake * 10) / 10);
  };

  const reset = () => {
    setWeight("");
    setActivity("");
    setResult(null);
    setError("");
  };

  return (
    <section id="health-calculator" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            💧 Hydration Tracker
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Smart Health Calculator
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find out exactly how much water you need daily based on your weight
            and activity level.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            {/* Card header */}
            <div className="teal-gradient px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-primary-foreground text-lg">
                  Daily Water Intake Calculator
                </h3>
                <p className="text-primary-foreground/75 text-sm">
                  Formula: Weight × 0.033 L
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Weight input */}
              <div className="space-y-2">
                <Label
                  htmlFor="weight"
                  className="font-semibold text-foreground"
                >
                  Your Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g. 65"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min={1}
                  max={300}
                  className="h-11 rounded-xl border-input focus:border-primary focus:ring-primary"
                  data-ocid="health_calculator.weight_input"
                />
              </div>

              {/* Activity dropdown */}
              <div className="space-y-2">
                <Label
                  htmlFor="activity"
                  className="font-semibold text-foreground"
                >
                  Daily Activity Level
                </Label>
                <Select
                  value={activity}
                  onValueChange={(val) => setActivity(val as ActivityLevel)}
                >
                  <SelectTrigger
                    id="activity"
                    className="h-11 rounded-xl"
                    data-ocid="health_calculator.activity_select"
                  >
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      🚶 Low — Mostly sedentary, little exercise
                    </SelectItem>
                    <SelectItem value="medium">
                      🏃 Medium — Light exercise 3–5 days/week
                    </SelectItem>
                    <SelectItem value="high">
                      ⚡ High — Intense exercise daily
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Error */}
              {error && (
                <p
                  className="text-destructive text-sm font-medium bg-destructive/5 border border-destructive/15 rounded-lg px-3 py-2"
                  data-ocid="health_calculator.error_state"
                >
                  {error}
                </p>
              )}

              {/* Result */}
              {result !== null && activity && (
                <div
                  className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center animate-scale-in"
                  data-ocid="health_calculator.success_state"
                >
                  <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm mb-1">
                    Your recommended daily intake
                  </p>
                  <p className="font-display font-bold text-5xl text-primary mb-1">
                    {result}
                    <span className="text-2xl ml-1">L</span>
                  </p>
                  <p className="text-foreground/70 text-sm font-medium mt-3 bg-primary/8 rounded-lg px-4 py-2 inline-block">
                    💡 {activityTips[activity as ActivityLevel]}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  onClick={calculate}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold transition-smooth"
                  data-ocid="health_calculator.calculate_button"
                >
                  Calculate Intake
                </Button>
                {result !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={reset}
                    className="px-5 rounded-xl h-11 transition-smooth"
                    data-ocid="health_calculator.reset_button"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
