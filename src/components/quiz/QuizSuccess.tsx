'use client';
const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

export default function QuizSuccess() {
  return (
    <div className="max-w-[640px] mx-auto px-4 py-12 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: '#E8F5F0' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B7A4E" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#0B2545' }}>
        Thank you — your responses have been received
      </h1>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: '#5C5C56' }}>
        Based on what you shared, we have put together some free educational resources to help you understand your UC care options and prepare for conversations with your gastroenterologist.
      </p>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: '#5C5C56' }}>
        Check your inbox — we are sending you a free educational guide to help you get the most from your next GI appointment.
      </p>
      <div className="p-4 rounded-xl mb-8" style={{ backgroundColor: '#FDECEA', border: '1px solid #C0392B' }}>
        <p className="text-sm" style={{ color: '#C0392B' }}>
          <strong>Important:</strong> This is not medical advice. If symptoms are severe or urgent, contact your doctor or seek emergency care immediately.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <a
          href={`${BASE}/free-uc-flare-guide`}
          className="block px-6 py-3 rounded-lg text-sm font-semibold text-white"
          style={{ backgroundColor: '#C8902A' }}
        >
          Download your free UC Flare Survival Guide →
        </a>
        <a
          href={`${BASE}/gi-doctor-questions`}
          className="block px-6 py-3 rounded-lg text-sm font-semibold border"
          style={{ borderColor: '#0B2545', color: '#0B2545' }}
        >
          See questions to ask your GI doctor →
        </a>
      </div>
    </div>
  );
}
