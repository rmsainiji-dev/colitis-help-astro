'use client';
import { useState } from 'react';
import { useQuizStore } from '@/lib/quizStore';

const OPTIONS = [
  'Diagnosed with ulcerative colitis',
  "Diagnosed with Crohn's disease",
  'Told I may have IBD but not sure',
  'I have symptoms but no diagnosis yet',
  'Not sure',
];

export default function QuizStep2Diagnosis() {
  const { answers, updateAnswers, nextStep, prevStep } = useQuizStore();
  const [selected, setSelected] = useState(answers.diagnosisStatus || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selected) { setError('Please select an option.'); return; }
    updateAnswers({ diagnosisStatus: selected });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#0B2545' }}>
        What is your diagnosis status?
      </h2>
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
