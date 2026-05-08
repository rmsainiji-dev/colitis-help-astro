export default function QuizEntrySection() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#F4F4F2' }}>
      <div className="max-w-[700px] mx-auto rounded-2xl p-10" style={{ backgroundColor: '#E4F5F7' }}>
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#C8902A', color: 'white' }}>
            Free — Takes 3 Minutes
          </span>
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#0B2545' }}>Free UC Care Options Check</h2>
          <p className="text-base leading-relaxed" style={{ color: '#5C5C56' }}>
            Answer 8 short questions about your symptoms, diagnosis, and insurance. Get educational guidance and, where appropriate, possible next-step options from selected care-navigation partners. No medical advice — just information.
          </p>
        </div>
        <ul className="space-y-2 mb-6">
          {[
            'Understand where you are in your UC journey',
            'Learn what treatment options may be worth discussing with your doctor',
            'See whether clinical trial or care-navigation options may apply to you',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#0B2545' }}>
              <span style={{ color: '#1B7A4E' }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
        <a href="/uc-care-options-check" className="block w-full py-4 rounded-xl font-bold text-lg text-white text-center" style={{ backgroundColor: '#C8902A' }}>
          Start Free Check (8 Questions)
        </a>
        <p className="text-center text-xs mt-3" style={{ color: '#5C5C56' }}>No cost. No commitment. Educational guidance only.</p>
      </div>
    </section>
  );
}
