'use client';
import { useState } from 'react';
import { useQuizStore } from '@/lib/quizStore';

const OPTIONS = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'UnitedHealthcare',
  'Medicare',
  'Medicaid',
  'Tricare / Military',
  'No insurance',
  'Other commercial insurance',
  'Prefer not to say',
];

export default function QuizStep5Insurance() {
  const { answers, updateAnswers, nextStep, prevStep } = useQuizStore();
  const [selected, setSelected] = useState(answers.insurance || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selected) { setError('Please select an option.'); return; }
    updateAnswers({ insurance: selected });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: '#0B2545' }}>
        What is your insurance situation?
      </h2>
      <p className="text-sm mb-5" style={{ color: '#5C5C56' }}>
        This helps us understand what care-navigation options may apply
      </p>
      <div className="flex flex-col gap-3 mb-5">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => { setSelected(opt); setError(''); }}
            className="px-4 py-3 rounded-xl text-sm font-medium text-left border transition-all"
            style={{
              backgroundColor: selected === opt ? '#E4F5F7' : 'white',
              borderColor: selected === opt ? '#0E6B8E' : '#E8E8E4',
              color: '#0B2545',
            }}
          >
            {selected === opt ? '● ' : '○ '}{opt}
          </button>
        ))}
      </div>
      {error && <p className="text-sm mb-3" style={{ color: '#C0392B' }}>{error}</p>}
      <div className="flex gap-3">
        <button onClick={prevStep} className="flex-1 py-3 rounded-lg font-semibold text-sm border" style={{ borderColor: '#0B2545', color: '#0B2545' }}>← Back</button>
        <button onClick={handleNext} className="flex-1 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#C8902A' }}>Continue →</button>
      </div>
    </div>
  );
}
