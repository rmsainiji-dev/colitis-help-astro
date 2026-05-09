const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycby3rsGTqMX4FyZWK_pomKlqux7UlzGqv0w0WFxLBzmGPmhyxZFd9s6Kt--hKhKb5QFN/exec';

// text/plain is a CORS-safelisted content type — no preflight request needed.
// Apps Script adds Access-Control-Allow-Origin:* so the browser accepts the response.
async function post(payload: object): Promise<void> {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Sheets submission failed:', err);
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
