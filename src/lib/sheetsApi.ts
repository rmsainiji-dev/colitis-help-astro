const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycby3rsGTqMX4FyZWK_pomKlqux7UlzGqv0w0WFxLBzmGPmhyxZFd9s6Kt--hKhKb5QFN/exec';

async function post(payload: object): Promise<void> {
  const body = JSON.stringify(payload);
  console.log('[Sheets] Sending:', body);
  try {
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    });
    const text = await res.text();
    console.log('[Sheets] Response:', res.status, text);
  } catch (err) {
    console.error('[Sheets] Fetch failed:', err);
    // Fallback: try as GET with query param (avoids all CORS issues)
    try {
      const url = `${SHEETS_URL}?payload=${encodeURIComponent(body)}`;
      await fetch(url);
      console.log('[Sheets] Fallback GET sent');
    } catch (err2) {
      console.error('[Sheets] Fallback also failed:', err2);
    }
  }
}

export async function submitQuiz(answers: object): Promise<void> {
  await post({ type: 'quiz', ...answers, source: 'quiz' });
}

export async function submitLead(data: {
  email: string;
  name?: string;
  state?: string;
  source: string;
  consentGiven?: boolean;
}): Promise<void> {
  await post({ type: 'lead', ...data });
}

export async function submitConsent(data: {
  email: string;
  phone?: string;
  source: string;
}): Promise<void> {
  await post({
    type: 'consent',
    ...data,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    consentText:
      'I agree that Colitis Help USA may contact me by phone, text, or email and may share my information, including health-related responses, with selected healthcare providers, care-navigation partners, or service partners who may contact me about UC-related care options.',
  });
}
