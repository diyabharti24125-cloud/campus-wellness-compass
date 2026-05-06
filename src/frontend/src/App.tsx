import { Navbar } from "./components/Navbar";
import { EmergencySOS } from "./pages/EmergencySOS";
import { Footer } from "./pages/Footer";
import { HealthCalculator } from "./pages/HealthCalculator";
import { HeroSection } from "./pages/HeroSection";
import { MedicineReminder } from "./pages/MedicineReminder";
import { NutritionPlanner } from "./pages/NutritionPlanner";
import { SleepOptimizer } from "./pages/SleepOptimizer";
import { SymptomGuide } from "./pages/SymptomGuide";
import { WellnessQuiz } from "./pages/WellnessQuiz";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SymptomGuide />
        <HealthCalculator />
        <WellnessQuiz />
        <NutritionPlanner />
        <MedicineReminder />
        <SleepOptimizer />
        <EmergencySOS />
      </main>
      <Footer />
    </div>
  );
}
