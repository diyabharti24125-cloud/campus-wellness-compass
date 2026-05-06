export interface SymptomCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  firstAidSteps: string[];
  whenToSeeDoctor: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
}
