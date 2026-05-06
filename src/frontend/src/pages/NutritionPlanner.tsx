import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface MealOption {
  emoji: string;
  name: string;
  costRange: string;
  protein: number;
  carbs: number;
  fats: number;
  whyItWorks: string;
}

interface BudgetTier {
  label: string;
  range: string;
  options: MealOption[];
}

const budgetTiers: Record<"low" | "mid" | "high", BudgetTier> = {
  low: {
    label: "Under ₹50",
    range: "Budget-friendly picks under ₹50",
    options: [
      {
        emoji: "🍌",
        name: "Banana & Peanut Butter",
        costRange: "₹30–₹45",
        protein: 8,
        carbs: 32,
        fats: 12,
        whyItWorks: "High protein, sustained energy, zero cooking needed",
      },
      {
        emoji: "🥣",
        name: "Oats / Dalia",
        costRange: "₹15–₹30",
        protein: 6,
        carbs: 28,
        fats: 3,
        whyItWorks: "Filling, fiber-rich, and extremely low cost",
      },
    ],
  },
  mid: {
    label: "₹50–₹100",
    range: "Balanced meals for ₹50–₹100",
    options: [
      {
        emoji: "🍳",
        name: "Egg Thali (2 Eggs, Roti, Daal)",
        costRange: "₹60–₹90",
        protein: 18,
        carbs: 45,
        fats: 14,
        whyItWorks: "Complete balanced meal with high protein content",
      },
      {
        emoji: "🌯",
        name: "Paneer Wrap",
        costRange: "₹70–₹100",
        protein: 14,
        carbs: 38,
        fats: 10,
        whyItWorks: "Vegetarian, calcium-rich, easy to carry on campus",
      },
    ],
  },
  high: {
    label: "Above ₹100",
    range: "Premium nutrition options above ₹100",
    options: [
      {
        emoji: "🍗",
        name: "Chicken / Soya Meal Prep",
        costRange: "₹110–₹150",
        protein: 30,
        carbs: 40,
        fats: 12,
        whyItWorks: "High protein, ideal for muscle recovery after exercise",
      },
      {
        emoji: "🍓",
        name: "Fruit Salad with Greek Yogurt",
        costRange: "₹100–₹130",
        protein: 12,
        carbs: 35,
        fats: 4,
        whyItWorks: "Antioxidant-rich, light, refreshing post-study snack",
      },
    ],
  },
};

function NutritionBadge({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
      <span className="text-muted-foreground font-medium">{label}:</span>
      {value}g
    </span>
  );
}

function MealCard({ option, index }: { option: MealOption; index: number }) {
  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elevated transition-smooth flex flex-col gap-3"
      data-ocid={`nutrition_planner.meal_card.${index}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-bold text-foreground text-base leading-snug">
          {option.emoji} {option.name}
        </h3>
        <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
          {option.costRange}
        </span>
      </div>

      {/* Macro pills */}
      <div className="flex flex-wrap gap-2">
        <NutritionBadge label="Protein" value={option.protein} />
        <NutritionBadge label="Carbs" value={option.carbs} />
        <NutritionBadge label="Fats" value={option.fats} />
      </div>

      {/* Why it works */}
      <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
        <span className="font-semibold text-foreground/80">
          ✨ Why it works:{" "}
        </span>
        {option.whyItWorks}
      </p>
    </div>
  );
}

export function NutritionPlanner() {
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<BudgetTier | null>(null);
  const [error, setError] = useState("");

  const handleGetMealIdeas = () => {
    const value = Number.parseFloat(budget);
    if (!budget || Number.isNaN(value) || value <= 0) {
      setError("Please enter a valid budget amount in ₹.");
      setResult(null);
      return;
    }
    setError("");
    if (value < 50) {
      setResult(budgetTiers.low);
    } else if (value <= 100) {
      setResult(budgetTiers.mid);
    } else {
      setResult(budgetTiers.high);
    }
  };

  const handleReset = () => {
    setBudget("");
    setResult(null);
    setError("");
  };

  return (
    <section id="nutrition-planner" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            🥗 Student Budget Meals
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Pocket-Friendly Nutrition
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Smart meal ideas that fit your student budget — balanced macros at
            every price point.
          </p>
        </div>

        {/* Input Card */}
        <div className="max-w-md mx-auto mb-10">
          <div className="bg-card border border-border rounded-2xl shadow-card p-6 md:p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="budget-input"
                  className="text-sm font-semibold text-foreground"
                >
                  Enter your budget for this meal (₹)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm select-none">
                    ₹
                  </span>
                  <Input
                    id="budget-input"
                    type="number"
                    min={1}
                    placeholder="e.g. 80"
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      if (error) setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleGetMealIdeas()}
                    className="pl-8 h-11 rounded-xl border-input focus:border-primary/60 transition-smooth"
                    data-ocid="nutrition_planner.budget_input"
                  />
                </div>
                {error && (
                  <p
                    className="text-sm text-destructive font-medium"
                    data-ocid="nutrition_planner.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={handleGetMealIdeas}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold transition-smooth"
                data-ocid="nutrition_planner.get_meals_button"
              >
                🍽️ Get Meal Ideas
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div
            className="animate-fade-in"
            data-ocid="nutrition_planner.results_section"
          >
            {/* Tier label */}
            <div className="text-center mb-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5">
                {result.label}
              </Badge>
              <p className="text-muted-foreground text-sm mt-2">
                {result.range}
              </p>
            </div>

            {/* Meal cards grid */}
            <div
              className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
              data-ocid="nutrition_planner.meal_list"
            >
              {result.options.map((option, i) => (
                <MealCard key={option.name} option={option} index={i + 1} />
              ))}
            </div>

            {/* Reset button */}
            <div className="text-center mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="rounded-xl h-10 px-8 text-sm font-semibold border-border hover:border-primary/40 transition-smooth"
                data-ocid="nutrition_planner.reset_button"
              >
                Try Another Budget
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
