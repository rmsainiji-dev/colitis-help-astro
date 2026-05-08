export default function HeroSection() {
  return (
    <section style={{ backgroundColor: '#0B2545' }} className="relative overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: 'white' }}>
              Struggling with ulcerative colitis?{' '}
              <span style={{ color: '#0FA3C8' }}>
                Understand your symptoms, treatment options, and next steps.
              </span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
              Answer a few simple questions about your symptoms, treatment stage, insurance, and location. Colitis Help USA gives educational guidance and may connect you with selected care-navigation partners when appropriate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <a
                href="/uc-care-options-check"
                className="px-8 py-4 rounded-lg font-bold text-lg text-white text-center animate-pulse-gold"
                style={{ backgroundColor: '#C8902A' }}
              >
                Check My UC Care Options
              </a>
              <a
                href="/free-uc-flare-guide"
                className="px-8 py-4 rounded-lg font-semibold text-base text-center border-2"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
              >
                Download Free UC Flare Guide
              </a>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              This website is for education only. Not medical advice.
            </p>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <ellipse cx="160" cy="140" rx="120" ry="100" fill="rgba(14,107,142,0.15)" />
              <path d="M110 90 Q140 60 160 90 Q180 120 200 90 Q220 60 240 100 Q250 140 230 180 Q210 220 160 230 Q110 220 90 180 Q70 140 110 90Z" fill="rgba(15,163,200,0.2)" stroke="#0FA3C8" strokeWidth="2" />
              <circle cx="160" cy="140" r="30" fill="rgba(200,144,42,0.2)" stroke="#C8902A" strokeWidth="1.5" />
              <path d="M145 140 Q155 125 165 140 Q175 155 185 140" stroke="#C8902A" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="130" cy="110" r="8" fill="rgba(15,163,200,0.3)" />
              <circle cx="190" cy="110" r="8" fill="rgba(15,163,200,0.3)" />
              <circle cx="160" cy="170" r="6" fill="rgba(15,163,200,0.3)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
