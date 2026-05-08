import { QuizAnswers } from '@/types/quiz';

export type LeadScore = 'High' | 'Medium' | 'Low';

export function scoreLead(answers: Partial<QuizAnswers>): LeadScore {
  const hasBloodInStool = answers.symptoms?.includes('Blood in stool') ?? false;
  const isSevere = answers.symptomSeverity === 'Severe — symptoms are very difficult to manage';
  const isInFlare = answers.symptomSeverity === 'I am currently in a flare';
  const medicationNotWorking = answers.symptoms?.includes('Medication stopped working') ?? false;
  const hasInsurance = answers.insurance !== 'No insurance' && answers.insurance !== 'Prefer not to say' && !!answers.insurance;
  const hasPhone = !!answers.phone && answers.phone.trim().length >= 10;

  if ((hasBloodInStool || isSevere || isInFlare) && hasInsurance && hasPhone) {
    return 'High';
  }
  if ((medicationNotWorking || isInFlare) && hasInsurance) {
    return 'Medium';
  }
  return 'Low';
}
