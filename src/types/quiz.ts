export interface QuizAnswers {
  symptoms: string[];
  diagnosisStatus: string;
  currentTreatment: string;
  symptomSeverity: string;
  insurance: string;
  state: string;
  zipCode: string;
  fullName: string;
  email: string;
  phone?: string;
  bestContactTime: string;
  consentGiven: boolean;
}

export type QuizStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
