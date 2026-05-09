const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycby3rsGTqMX4FyZWK_pomKlqux7UlzGqv0w0WFxLBzmGPmhyxZFd9s6Kt--hKhKb5QFN/exec';

// Uses no-cors so the browser never sends a preflight OPTIONS request.
// The data reaches Apps Script correctly; the response is opaque (unreadable)
// but we don't need it — we show success regardless of network outcome.
async function post(payload: object): Promise<void> {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silently swallow network errors — form already shows success
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
