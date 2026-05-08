const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
export default function GIQuestionsCard() {
  return (
    <div
      className="rounded-xl p-6 my-6"
      style={{ backgroundColor: '#F5E8C7', border: '1px solid #C8902A' }}
    >
      <h3 className="font-bold text-lg mb-2" style={{ color: '#0B2545' }}>
        Questions to ask your GI doctor
      </h3>
      <p className="text-sm mb-4" style={{ color: '#5C5C56' }}>
        Download our free checklist of 25 questions covering symptoms, treatment options, biologics, clinical trials, insurance, and diet. Designed to help you make the most of every appointment.
      </p>
      <a
        href={`${BASE}/gi-doctor-questions`}
        className="inline-block px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
        style={{ backgroundColor: '#C8902A' }}
      >
        Get the Free Question Checklist →
      </a>
    </div>
  );
}
