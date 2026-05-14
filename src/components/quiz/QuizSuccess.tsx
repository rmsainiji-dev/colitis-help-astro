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
        Based on what you shared, we have put together a free educational guide to help you understand your UC care options and get the most from your next GI appointment.
      </p>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: '#5C5C56' }}>
        A copy is also being sent to your inbox.
      </p>

      <a
        href={`${BASE}/uc-care-options-guide.pdf`}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-4 rounded-xl text-sm font-semibold text-white mb-3 text-center"
        style={{ backgroundColor: '#C8902A' }}
      >
        Download your free UC Care Options Guide →
      </a>

      <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#E4F5F7', border: '1px solid #0E6B8E' }}>
        <p className="text-xs font-semibold mb-2" style={{ color: '#0B2545' }}>Inside your guide:</p>
        <ul className="text-xs space-y-1 text-left" style={{ color: '#5C5C56' }}>
          <li>→ UC severity levels and how treatment usually progresses</li>
          <li>→ Biologics explained in plain language — what they are and when doctors use them</li>
          <li>→ What remission really means — clinical, endoscopic, and deep</li>
          <li>→ Signs your current treatment may need adjustment and what to track weekly</li>
          <li>→ Questions to bring to your GI appointment and emergency warning signs</li>
        </ul>
      </div>

      <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#FDECEA', border: '1px solid #C0392B' }}>
        <p className="text-sm" style={{ color: '#C0392B' }}>
          <strong>Important:</strong> This is not medical advice. If symptoms are severe or urgent, contact your doctor or seek emergency care immediately.
        </p>
      </div>

    </div>
  );
}
