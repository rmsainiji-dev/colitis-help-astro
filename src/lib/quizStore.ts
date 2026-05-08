import { create } from 'zustand';
import type { QuizAnswers, QuizStep } from '@/types/quiz';

interface QuizState {
  step: QuizStep;
  answers: Partial<QuizAnswers>;
  submitted: boolean;
  setStep: (step: QuizStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateAnswers: (partial: Partial<QuizAnswers>) => void;
  setSubmitted: (v: boolean) => void;
  reset: () => void;
}

const initialAnswers: Partial<QuizAnswers> = {
  symptoms: [],
  diagnosisStatus: '',
  currentTreatment: '',
  symptomSeverity: '',
  insurance: '',
  state: '',
  zipCode: '',
  fullName: '',
  email: '',
  phone: '',
  bestContactTime: '',
  consentGiven: false,
};

export const useQuizStore = create<QuizState>((set) => ({
  step: 1,
  answers: { ...initialAnswers },
  submitted: false,
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 8) as QuizStep })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) as QuizStep })),
  updateAnswers: (partial) => set((s) => ({ answers: { ...s.answers, ...partial } })),
  setSubmitted: (submitted) => set({ submitted }),
  reset: () => set({ step: 1, answers: { ...initialAnswers }, submitted: false }),
}));
