'use client';
import { useState } from 'react';
import { useQuizStore } from '@/lib/quizStore';

const OPTIONS = [
  'Mild — symptoms are manageable',
  'Moderate — symptoms are affecting daily life',
  'I am currently in a flare',
  'Severe — symptoms are very difficult to manage',
  'I mainly need help understanding my next steps',
];

export default function QuizStep4Urgency() {
  const { answers, updateAnswers, nextStep, prevStep } = useQuizStore();
  const [selected, setSelected] = useState(answers.symptomSeverity || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selected) { setError('Please select an option.'); return; }
    updateAnswers({ symptomSeverity: selected });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#0B2545' }}>
        How would you describe your symptoms right now?
      </h2>
      <div className="flex flex-col gap-3 mb-4">
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
      <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#FDECEA', borderLeft: '4px solid #C0392B' }}>
        <p className="text-sm font-bold" style={{ color: '#C0392B' }}>⚠️ Emergency notice</p>
        <p className="text-sm mt-1" style={{ color: '#2A2A26' }}>
          If you have severe bleeding, high fever, or cannot keep fluids down — please seek emergency care or call 911. Do not continue this quiz.
        </p>
      </div>
      {error && <p className="text-sm mb-3" style={{ color: '#C0392B' }}>{error}</p>}
      <div className="flex gap-3">
        <button onClick={prevStep} className="flex-1 py-3 rounded-lg font-semibold text-sm border" style={{ borderColor: '#0B2545', color: '#0B2545' }}>← Back</button>
        <button onClick={handleNext} className="flex-1 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#C8902A' }}>Continue →</button>
      </div>
    </div>
  );
}
