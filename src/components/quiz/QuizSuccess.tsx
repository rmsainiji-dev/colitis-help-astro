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
        Thank you — your information has been received
      </h1>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: '#5C5C56' }}>
        Based on your responses, we may share educational resources and, where appropriate, selected care-navigation options that may apply to your situation.
      </p>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: '#5C5C56' }}>
        A care-navigation partner may contact you by email or phone if your responses match available options in your area.
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
