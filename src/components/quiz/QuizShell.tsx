'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuizStore } from '@/lib/quizStore';
import QuizStep1Symptoms from './QuizStep1Symptoms';
import QuizStep2Diagnosis from './QuizStep2Diagnosis';
import QuizStep3Treatment from './QuizStep3Treatment';
import QuizStep4Urgency from './QuizStep4Urgency';
import QuizStep5Insurance from './QuizStep5Insurance';
import QuizStep6Location from './QuizStep6Location';
import QuizStep7Contact from './QuizStep7Contact';
import QuizStep8Consent from './QuizStep8Consent';
import QuizSuccess from './QuizSuccess';

const STEPS = [
  QuizStep1Symptoms,
  QuizStep2Diagnosis,
  QuizStep3Treatment,
  QuizStep4Urgency,
  QuizStep5Insurance,
  QuizStep6Location,
  QuizStep7Contact,
  QuizStep8Consent,
];

export default function QuizShell() {
  const { step, submitted } = useQuizStore();

  if (submitted) return <QuizSuccess />;

  const StepComponent = STEPS[step - 1];

  return (
    <div className="max-w-[640px] mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: '#5C5C56' }}>
            Step {step} of 8
          </span>
          <span className="text-sm" style={{ color: '#5C5C56' }}>
            Free UC Care Options Check
          </span>
        </div>
        <div className="h-2 rounded-full" style={{ backgroundColor: '#E8E8E4' }}>
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ backgroundColor: '#C8902A', width: `${(step / 8) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
