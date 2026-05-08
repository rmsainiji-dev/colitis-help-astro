'use client';
import { useState } from 'react';
import { useQuizStore } from '@/lib/quizStore';

const OPTIONS = [
  'Blood in stool',
  'Urgent bowel movements',
  'Frequent diarrhea',
  'Abdominal pain or cramps',
  'Fatigue',
  'Weight loss',
  'Night-time bathroom trips',
  'Medication stopped working',
  'Recently diagnosed',
  'Looking for second opinion information',
  'Interested in clinical trials',
  'None of the above',
];

export default function QuizStep1Symptoms() {
  const { answers, updateAnswers, nextStep } = useQuizStore();
  const [selected, setSelected] = useState<string[]>(answers.symptoms || []);
  const [error, setError] = useState('');

  const toggle = (opt: string) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]));
    setError('');
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError('Please select at least one option.');
      return;
    }
    updateAnswers({ symptoms: selected });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: '#0B2545' }}>
        What are you dealing with right now?
      </h2>
      <p className="text-sm mb-5" style={{ color: '#5C5C56' }}>
        Select all that apply
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
            style={{
              backgroundColor: selected.includes(opt) ? '#0B2545' : 'white',
              color: selected.includes(opt) ? 'white' : '#0B2545',
              borderColor: selected.includes(opt) ? '#0B2545' : '#E8E8E4',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="text-sm mb-3" style={{ color: '#C0392B' }}>{error}</p>}
      <button
        onClick={handleNext}
        className="w-full py-3 rounded-lg font-semibold text-white"
        style={{ backgroundColor: '#C8902A' }}
      >
        Continue →
      </button>
    </div>
  );
}
