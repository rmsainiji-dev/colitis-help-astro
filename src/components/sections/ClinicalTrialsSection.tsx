const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
export default function ClinicalTrialsSection() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#0B2545' }}>
      <div className="max-w-[1220px] mx-auto">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'white' }}>UC clinical trials in the USA</h2>
        <p className="text-base mb-4 max-w-3xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Clinical trials study new treatments for UC and sometimes offer access to options not yet widely available. Eligibility depends on your diagnosis, location, current treatment, and disease activity.
        </p>
        <p className="text-base mb-8 max-w-3xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          This site can help you understand what clinical trials are and whether exploring one may be worth discussing with your GI doctor.
        </p>
        <a href={`${BASE}/ulcerative-colitis-clinical-trials-usa`} className="inline-block px-6 py-3 rounded-lg font-semibold text-sm text-white" style={{ backgroundColor: '#C8902A' }}>
          Explore UC Clinical Trial Options →
        </a>
      </div>
    </section>
  );
}
