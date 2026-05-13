const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: "Is ulcerative colitis the same as Crohn's disease?",
    a: "No. Both are forms of inflammatory bowel disease (IBD), but they affect different parts of the digestive tract. UC affects only the colon (large intestine), while Crohn's can affect any part from the mouth to the anus. Symptoms and treatment approaches can differ.",
  },
  {
    q: 'What is a UC flare-up?',
    a: 'A flare is when UC symptoms return or become more intense after a period of remission — when symptoms were under control. Flares can vary in severity and can be triggered by stress, certain foods, illness, or changes in medication.',
  },
  {
    q: 'Can diet alone control UC?',
    a: 'Diet can help manage symptoms and reduce flare triggers, but it is not a replacement for medical treatment. There is no single UC diet that works for everyone. Working with your healthcare provider and possibly a dietitian is the best approach.',
  },
  {
    q: 'What if mesalamine stops working?',
    a: "If 5-ASA medications are no longer controlling your UC symptoms, there are other options your GI doctor may consider — including immunosuppressants, biologics, or JAK inhibitors. This is worth raising at your next appointment.",
  },
  {
    q: 'What questions should I ask my GI doctor?',
    a: 'Download our free checklist of 25 questions covering symptoms, treatment options, biologics, clinical trials, insurance, and diet. It is designed to help you make the most of every appointment.',
  },
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0B2545' }}>Common questions about UC</h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8E8E4' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full text-left px-5 py-4 flex justify-between items-center font-semibold text-sm"
                style={{ color: '#0B2545', backgroundColor: 'white' }}
              >
                {f.q}
                <span aria-hidden="true" style={{ color: '#0E6B8E', flexShrink: 0, marginLeft: 8 }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div id={`faq-answer-${i}`} role="region" className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#5C5C56', backgroundColor: 'white' }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a href={`${BASE}/ibd-guide`} className="text-sm underline" style={{ color: '#0E6B8E' }}>
            See all UC questions and answers →
          </a>
        </div>
      </div>
    </section>
  );
}
