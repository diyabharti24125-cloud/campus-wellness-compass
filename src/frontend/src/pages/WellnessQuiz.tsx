import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/types";
import { useState } from "react";

const questions: QuizQuestion[] = [
  { id: 1, question: "Did you sleep 7 or more hours last night?" },
  { id: 2, question: "Did you drink at least 2 litres of water today?" },
  { id: 3, question: "Did you do any physical exercise or stretching today?" },
  { id: 4, question: "Is your current stress level low or manageable?" },
];

type Answer = "yes" | "no" | null;

export function WellnessQuiz() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (id: number, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const yesCount = Object.values(answers).filter((a) => a === "yes").length;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (allAnswered) setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const isWellnessPro = yesCount >= 3;

  return (
    <section id="wellness-quiz" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            ✅ Daily Check-In
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Wellness Check Quiz
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Answer 4 quick questions to find out how well you're taking care of
            yourself today.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground font-medium">
                {Object.keys(answers).length}/{questions.length} answered
              </span>
              <div className="flex gap-1.5">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className={`w-8 h-1.5 rounded-full transition-smooth ${
                      answers[q.id] ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-5" data-ocid="wellness_quiz.list">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className="border border-border rounded-xl p-4"
                  data-ocid={`wellness_quiz.item.${i + 1}`}
                >
                  <p className="font-medium text-foreground mb-3 text-sm leading-relaxed">
                    <span className="text-primary font-bold mr-2">{q.id}.</span>
                    {q.question}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={answers[q.id] === "yes" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnswer(q.id, "yes")}
                      disabled={submitted}
                      className={`flex-1 rounded-lg h-9 font-semibold transition-smooth ${
                        answers[q.id] === "yes"
                          ? "bg-primary text-primary-foreground"
                          : "hover:border-primary/50"
                      }`}
                      data-ocid={`wellness_quiz.yes_button.${i + 1}`}
                    >
                      ✓ Yes
                    </Button>
                    <Button
                      type="button"
                      variant={answers[q.id] === "no" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleAnswer(q.id, "no")}
                      disabled={submitted}
                      className="flex-1 rounded-lg h-9 font-semibold transition-smooth"
                      data-ocid={`wellness_quiz.no_button.${i + 1}`}
                    >
                      ✗ No
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            {!submitted && (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold transition-smooth disabled:opacity-50"
                data-ocid="wellness_quiz.submit_button"
              >
                {allAnswered
                  ? "See My Wellness Score"
                  : "Answer all questions to continue"}
              </Button>
            )}

            {/* Result */}
            {submitted && (
              <div
                className={`mt-6 rounded-2xl p-6 text-center animate-scale-in ${
                  isWellnessPro
                    ? "bg-primary/8 border border-primary/20"
                    : "bg-accent/8 border border-accent/20"
                }`}
                data-ocid="wellness_quiz.success_state"
              >
                <div className="text-4xl mb-3">
                  {isWellnessPro ? "🌟" : "🔋"}
                </div>
                <h3
                  className={`font-display font-bold text-xl mb-2 ${
                    isWellnessPro ? "text-primary" : "text-accent"
                  }`}
                >
                  {isWellnessPro
                    ? "You're a Wellness Pro!"
                    : "Take a break and recharge!"}
                </h3>
                <p className="text-muted-foreground text-sm mb-1">
                  You answered{" "}
                  <strong className="text-foreground">
                    {yesCount} out of 4
                  </strong>{" "}
                  with Yes.
                </p>
                <p className="text-foreground/70 text-sm mt-2">
                  {isWellnessPro
                    ? "Great job taking care of yourself today. Keep up the healthy habits!"
                    : "Small changes matter. Try sleeping a bit earlier and keeping a water bottle handy."}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="mt-4 rounded-xl h-9 px-6 text-sm font-semibold border-border hover:border-primary/40 transition-smooth"
                  data-ocid="wellness_quiz.retake_button"
                >
                  Retake Quiz
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
