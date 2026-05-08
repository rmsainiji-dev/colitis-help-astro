const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
export default function FinalCTASection() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#0E6B8E' }}>
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'white' }}>Ready to understand your UC care options?</h2>
        <p className="text-base mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Answer 8 short questions about your symptoms, diagnosis, and insurance. Get educational guidance and, where appropriate, possible next-step options from selected care-navigation partners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`${BASE}/uc-care-options-check`} className="px-8 py-4 rounded-xl font-bold text-lg text-white" style={{ backgroundColor: '#C8902A' }}>
            Check My UC Care Options
          </a>
          <a href={`${BASE}/gi-doctor-questions`} className="px-8 py-4 rounded-xl font-semibold text-base border-2" style={{ borderColor: 'white', color: 'white' }}>
            See Questions to Ask My GI Doctor
          </a>
        </div>
      </div>
    </section>
  );
}
