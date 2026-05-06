import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Info, Moon, Star } from "lucide-react";
import { useState } from "react";

interface WakeUpOption {
  cycles: number;
  hours: number;
  time: string;
  recommended: boolean;
}

function addMinutesToTime(baseTime: string, minutes: number): string {
  const [hourStr, minStr] = baseTime.split(":");
  const totalMinutes =
    Number.parseInt(hourStr) * 60 + Number.parseInt(minStr) + minutes;
  const wrappedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(wrappedMinutes / 60);
  const m = wrappedMinutes % 60;
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m.toString().padStart(2, "0");
  return `${displayH}:${displayM} ${period}`;
}

function calculateWakeUpTimes(bedtime: string): WakeUpOption[] {
  const options = [
    { cycles: 3, hours: 4.5 },
    { cycles: 4, hours: 6 },
    { cycles: 5, hours: 7.5 },
    { cycles: 6, hours: 9 },
  ];
  return options.map(({ cycles, hours }) => ({
    cycles,
    hours,
    time: addMinutesToTime(bedtime, hours * 60),
    recommended: cycles === 5,
  }));
}

export function SleepOptimizer() {
  const [bedtime, setBedtime] = useState("");
  const [wakeOptions, setWakeOptions] = useState<WakeUpOption[] | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!bedtime) {
      setError("Please select your target bedtime.");
      return;
    }
    setWakeOptions(calculateWakeUpTimes(bedtime));
  };

  const reset = () => {
    setBedtime("");
    setWakeOptions(null);
    setError("");
  };

  return (
    <section id="sleep-optimizer" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            😴 Sleep Science
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Sleep Hygiene Optimizer
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Wake up refreshed — align with your natural sleep cycles
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Calculator Card */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            {/* Card header */}
            <div className="teal-gradient px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Moon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-primary-foreground text-lg">
                  Sleep Cycle Calculator
                </h3>
                <p className="text-primary-foreground/75 text-sm">
                  Based on 90-minute natural sleep cycles
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Bedtime input */}
              <div className="space-y-2">
                <Label
                  htmlFor="bedtime"
                  className="font-semibold text-foreground"
                >
                  When do you plan to sleep?
                </Label>
                <Input
                  id="bedtime"
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="h-11 rounded-xl border-input focus:border-primary focus:ring-primary"
                  data-ocid="sleep_optimizer.bedtime_input"
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  className="text-destructive text-sm font-medium bg-destructive/5 border border-destructive/15 rounded-lg px-3 py-2"
                  data-ocid="sleep_optimizer.error_state"
                >
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  onClick={calculate}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold transition-smooth"
                  data-ocid="sleep_optimizer.calculate_button"
                >
                  Calculate Wake-Up Times
                </Button>
                {wakeOptions && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={reset}
                    className="px-5 rounded-xl h-11 transition-smooth"
                    data-ocid="sleep_optimizer.reset_button"
                  >
                    Reset
                  </Button>
                )}
              </div>

              {/* Results */}
              {wakeOptions && (
                <div
                  className="space-y-3 pt-2"
                  data-ocid="sleep_optimizer.success_state"
                >
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Optimal wake-up times
                  </p>
                  {wakeOptions.map((opt, i) => (
                    <div
                      key={opt.cycles}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 border transition-smooth ${
                        opt.recommended
                          ? "bg-primary/8 border-primary/30 shadow-card"
                          : "bg-background border-border"
                      }`}
                      data-ocid={`sleep_optimizer.item.${i + 1}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            opt.recommended ? "bg-primary/20" : "bg-muted"
                          }`}
                        >
                          <Clock
                            className={`w-4 h-4 ${
                              opt.recommended
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div>
                          <p
                            className={`font-display font-bold text-lg leading-tight ${
                              opt.recommended
                                ? "text-primary"
                                : "text-foreground"
                            }`}
                          >
                            Wake up at {opt.time}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            After {opt.cycles} sleep cycles ({opt.hours} hours)
                          </p>
                        </div>
                      </div>
                      {opt.recommended && (
                        <Badge className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Science Info Box */}
          <div
            className="bg-card rounded-2xl border-l-4 border-l-primary border border-border px-6 py-5 shadow-subtle"
            data-ocid="sleep_optimizer.science_panel"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-3">
                <h4 className="font-display font-bold text-foreground text-base">
                  💡 The Science of Sleep Cycles
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your brain moves through 90-minute cycles of light sleep, deep
                  sleep, and REM. Waking up at the{" "}
                  <span className="font-semibold text-foreground">
                    END of a cycle
                  </span>{" "}
                  — rather than the middle — dramatically reduces{" "}
                  <span className="font-semibold text-foreground">
                    "sleep inertia"
                  </span>{" "}
                  (morning brain fog). Most adults need 4–6 complete cycles (6–9
                  hours) per night.
                </p>
                <div className="bg-primary/6 border border-primary/15 rounded-xl px-4 py-3">
                  <p className="text-sm text-foreground/80">
                    <span className="font-semibold text-primary">
                      ⏱ Pro Tip:
                    </span>{" "}
                    Add <span className="font-semibold">14 minutes</span> to
                    your bedtime to account for the average time it takes to
                    fall asleep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
