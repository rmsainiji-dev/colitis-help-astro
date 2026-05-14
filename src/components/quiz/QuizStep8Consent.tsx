'use client';
import { useState } from 'react';
import { useQuizStore } from '@/lib/quizStore';
import { submitQuiz, submitConsent } from '@/lib/sheetsApi';

const CONSENT_TEXT =
  'I agree that Colitis Help USA may contact me by email to share free educational resources about ulcerative colitis care options. My information will not be sold. Consent is not required to use this website.';

export default function QuizStep8Consent() {
  const { answers, prevStep, setSubmitted } = useQuizStore();
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!agreed) {
      setError('You must agree to the consent statement to continue.');
      return;
    }
    setLoading(true);
    const quizOk = await submitQuiz({ ...answers, consentGiven: true });
    await submitConsent({
      email: answers.email || '',
      phone: answers.phone || '',
      source: 'quiz',
    });
    setLoading(false);
    if (quizOk) {
      setSubmitted(true);
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#0B2545' }}>
        One last step — please review and agree
      </h2>
      <div className="p-4 rounded-xl mb-5" style={{ backgroundColor: '#F4F4F2', border: '1px solid #E8E8E4' }}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => { setAgreed(e.target.checked); setError(''); }}
            className="mt-1 w-4 h-4 shrink-0"
            style={{ accentColor: '#C8902A' }}
          />
          <span className="text-sm leading-relaxed" style={{ color: '#2A2A26' }}>{CONSENT_TEXT}</span>
        </label>
      </div>
      {error && <p className="text-sm mb-3" style={{ color: '#C0392B' }}>{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 rounded-lg font-semibold text-lg text-white disabled:opacity-60 mb-2"
        style={{ backgroundColor: '#C8902A' }}
      >
        {loading ? 'Submitting...' : 'Submit — See My Care Options'}
      </button>
      <p className="text-xs text-center" style={{ color: '#5C5C56' }}>
        This is not medical advice. We do not diagnose or treat conditions.
      </p>
      <div className="mt-4">
        <button onClick={prevStep} className="text-sm" style={{ color: '#0E6B8E', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>
    </div>
  );
}
