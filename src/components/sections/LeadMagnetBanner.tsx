'use client';
import InlineEmailCapture from '@/components/forms/InlineEmailCapture';

export default function LeadMagnetBanner() {
  return (
    <section
      className="py-16 px-6"
      style={{ background: 'linear-gradient(135deg, #071A32 0%, #0B2545 100%)' }}
    >
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-3xl font-bold mb-3" style={{ color: 'white' }}>
          Free Download: UC Flare Survival Guide
        </h2>
        <p className="text-base mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          A plain-English guide to understanding flares, what to eat, when to call your doctor, and questions to ask at your next GI visit.
        </p>
        <ul className="space-y-2 mb-8">
          {[
            'Foods that may help and hurt during a flare',
            'Warning signs that mean you should call your doctor',
            '25 questions to ask your GI doctor',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <span style={{ color: '#C8902A' }}>✓</span>
              {item}
            </li>
          ))}
          <li className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
            <span style={{ color: '#C8902A' }}>✓</span>
            A free printable{' '}
            <a href="/uc-symptom-tracker" style={{ color: '#C8902A', textDecoration: 'underline' }}>
              symptom tracker
            </a>
            {' '}to bring to your GI appointment
          </li>
        </ul>
        <InlineEmailCapture source="Homepage Lead Magnet" buttonText="Send Me the Free Guide" />
        <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          I agree that Colitis Help USA may contact me by email to share free educational resources about ulcerative colitis care options. My information will not be sold. Consent is not required to use this website.
        </p>
      </div>
    </section>
  );
}
