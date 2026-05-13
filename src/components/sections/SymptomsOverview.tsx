import EmergencyWarning from '@/components/layout/EmergencyWarning';

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

const SYMPTOMS = [
  { icon: '🩸', title: 'Bloody diarrhea or blood in stool', desc: 'One of the most common and noticeable UC symptoms, caused by inflammation in the colon lining.' },
  { icon: '🚽', title: 'Frequent and urgent bowel movements', desc: 'A sudden, strong need to use the bathroom that is hard to control.' },
  { icon: '😣', title: 'Abdominal cramping and pain', desc: 'Pain and pressure in the belly, often before or during bowel movements.' },
  { icon: '😴', title: 'Fatigue and low energy', desc: 'Ongoing tiredness often linked to inflammation, blood loss, or disrupted sleep.' },
  { icon: '⚖️', title: 'Unintended weight loss', desc: 'Losing weight without trying, often due to reduced appetite or nutrient absorption.' },
  { icon: '🔄', title: 'Feeling of incomplete emptying', desc: 'A persistent feeling that bowels have not fully emptied after using the bathroom.' },
];

export default function SymptomsOverview() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-[1220px] mx-auto">
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#0B2545' }}>Common ulcerative colitis symptoms</h2>
        <p className="text-base mb-8" style={{ color: '#5C5C56' }}>UC symptoms vary widely by person and can change over time. Most common signs include:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SYMPTOMS.map((s) => (
            <div key={s.title} className="rounded-xl p-5" style={{ border: '1px solid #E8E8E4', backgroundColor: 'white' }}>
              <span className="text-3xl mb-3 block">{s.icon}</span>
              <h3 className="font-bold text-base mb-1" style={{ color: '#0B2545' }}>{s.title}</h3>
              <p className="text-sm" style={{ color: '#5C5C56' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <a href={`${BASE}/ulcerative-colitis-symptoms`} className="text-sm underline" style={{ color: '#0E6B8E' }}>Learn more about UC symptoms →</a>
        <div className="mt-8"><EmergencyWarning /></div>
      </div>
    </section>
  );
}
