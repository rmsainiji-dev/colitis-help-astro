const TREATMENTS = [
  { title: 'Aminosalicylates (5-ASA / mesalamine)', desc: "Often the first treatment tried for mild to moderate UC. Works directly on the lining of the colon to reduce inflammation.", tag: 'Mild to moderate UC' },
  { title: 'Biologics', desc: "Target specific parts of the immune system to reduce inflammation. Usually considered when other treatments haven't worked well enough.", tag: 'Moderate to severe UC' },
  { title: 'JAK inhibitors', desc: 'A newer type of oral medication that blocks inflammation signals inside cells. Can be an option for moderate to severe UC.', tag: 'Moderate to severe UC' },
];

export default function TreatmentEducationSection() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-[1220px] mx-auto">
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#0B2545' }}>Understanding UC treatment options</h2>
        <p className="text-base mb-8 max-w-3xl" style={{ color: '#5C5C56' }}>
          UC treatment depends on how severe your symptoms are, where the inflammation is, and how you&apos;ve responded to treatment in the past.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {TREATMENTS.map((t) => (
            <div key={t.title} className="rounded-xl p-6" style={{ border: '1px solid #E8E8E4' }}>
              <h3 className="font-bold text-base mb-2" style={{ color: '#0B2545' }}>{t.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#5C5C56' }}>{t.desc}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#E4F5F7', color: '#0E6B8E' }}>{t.tag}</span>
            </div>
          ))}
        </div>
        <a href="/ulcerative-colitis-treatment-options" className="text-sm underline" style={{ color: '#0E6B8E' }}>Compare all UC treatment options →</a>
        <p className="text-xs mt-4" style={{ color: '#9C9C96' }}>Information about treatment options is educational. Speak with your licensed healthcare provider before making any treatment decisions.</p>
      </div>
    </section>
  );
}
