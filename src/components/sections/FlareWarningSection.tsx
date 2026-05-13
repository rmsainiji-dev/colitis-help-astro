const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
export default function FlareWarningSection() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#F4F4F2' }}>
      <div className="max-w-[1220px] mx-auto">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#0B2545' }}>When symptoms get worse: understanding a UC flare</h2>
        <p className="text-base mb-4 leading-relaxed max-w-3xl" style={{ color: '#5C5C56' }}>
          A flare is when UC symptoms return or become more intense after a period of remission. Most people with UC experience flares at some point.
        </p>
        <p className="text-base mb-8 leading-relaxed max-w-3xl" style={{ color: '#5C5C56' }}>
          Warning signs of a flare include: increased stool frequency, more blood than usual, worsening cramping, fatigue, and feeling unable to manage daily activities. Knowing your warning signs helps you act sooner.
        </p>
        <div className="rounded-2xl p-8 max-w-xl" style={{ backgroundColor: '#0E6B8E' }}>
          <h3 className="font-bold text-xl mb-2" style={{ color: 'white' }}>Free UC Flare Survival Guide</h3>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Plain-English guidance on what to eat during a flare, when to call your doctor, and questions to ask at your next GI visit.
          </p>
          <a href={`${BASE}/free-uc-flare-guide`} className="inline-block px-6 py-3 rounded-lg font-semibold text-sm text-white" style={{ backgroundColor: '#C8902A' }}>
            Download Free Flare Guide
          </a>
        </div>
      </div>
    </section>
  );
}
