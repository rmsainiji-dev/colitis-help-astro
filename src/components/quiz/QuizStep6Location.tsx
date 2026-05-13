'use client';
import { useState } from 'react';
import { useQuizStore } from '@/lib/quizStore';
import { US_STATES } from '@/lib/stateList';

export default function QuizStep6Location() {
  const { answers, updateAnswers, nextStep, prevStep } = useQuizStore();
  const [state, setState] = useState(answers.state || '');
  const [zip, setZip] = useState(answers.zipCode || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!state) { setError('Please select your state.'); return; }
    if (zip && !/^\d{5}$/.test(zip)) { setError('ZIP code must be 5 digits.'); return; }
    updateAnswers({ state, zipCode: zip });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: '#0B2545' }}>
        Where are you located?
      </h2>
      <p className="text-sm mb-5" style={{ color: '#5C5C56' }}>
        We only provide guidance for people in the United States
      </p>
      <div className="space-y-4 mb-5">
        <div>
          <label htmlFor="quiz-state" className="block text-sm font-medium mb-1" style={{ color: '#0B2545' }}>State *</label>
          <select
            id="quiz-state"
            value={state}
            onChange={(e) => { setState(e.target.value); setError(''); }}
            className="w-full px-4 py-3 rounded-lg border text-sm"
            style={{ borderColor: '#E8E8E4', color: '#2A2A26', backgroundColor: 'white' }}
          >
            <option value="">Select your state</option>
            {US_STATES.map((s) => (
              <option key={s.abbr} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quiz-zip" className="block text-sm font-medium mb-1" style={{ color: '#0B2545' }}>
            ZIP code (optional but encouraged)
          </label>
          <input
            id="quiz-zip"
            type="text"
            value={zip}
            onChange={(e) => { setZip(e.target.value); setError(''); }}
            placeholder="e.g. 90210"
            maxLength={5}
            className="w-full px-4 py-3 rounded-lg border text-sm"
            style={{ borderColor: '#E8E8E4', color: '#2A2A26', backgroundColor: 'white' }}
          />
        </div>
      </div>
      {error && <p className="text-sm mb-3" style={{ color: '#C0392B' }}>{error}</p>}
      <div className="flex gap-3">
        <button onClick={prevStep} className="flex-1 py-3 rounded-lg font-semibold text-sm border" style={{ borderColor: '#0B2545', color: '#0B2545' }}>← Back</button>
        <button onClick={handleNext} className="flex-1 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#C8902A' }}>Continue →</button>
      </div>
    </div>
  );
}
