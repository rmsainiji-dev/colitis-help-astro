const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
export default function DietSection() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#F4F4F2' }}>
      <div className="max-w-[1220px] mx-auto">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#0B2545' }}>Diet, food, and UC flares</h2>
        <p className="text-base mb-4 max-w-3xl leading-relaxed" style={{ color: '#5C5C56' }}>
          There is no single UC diet that works for everyone. But many people find that certain foods — like high-fiber raw vegetables, dairy, spicy food, or caffeine — can trigger symptoms during a flare.
        </p>
        <p className="text-base mb-6 max-w-3xl leading-relaxed" style={{ color: '#5C5C56' }}>
          During remission, most people can eat a broader range of foods. Keeping a food and symptom diary can help you identify your personal triggers.
        </p>
        <a href={`${BASE}/what-to-eat-during-uc-flare`} className="text-sm underline" style={{ color: '#0E6B8E' }}>What to eat during a UC flare →</a>
      </div>
    </section>
  );
}
