const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycby25YbtNY66qhiw2UuLNMS3UN6Njc8vCCYkmmnKyJKQmvZ0q7O9PO1eUQtxwhEYrDfE9g/exec';

async function post(payload: object): Promise<boolean> {
  const body = JSON.stringify(payload);
  try {
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    });
    await res.text();
    return true;
  } catch {
    // Fallback: GET with query param avoids CORS preflight
    try {
      const url = `${SHEETS_URL}?payload=${encodeURIComponent(body)}`;
      await fetch(url);
      return true;
    } catch {
      return false;
    }
  }
}

export async function submitQuiz(answers: object): Promise<boolean> {
  return post({ type: 'quiz', ...answers, source: 'quiz' });
}

export async function submitLead(data: {
  email: string;
  name?: string;
  state?: string;
  source: string;
  consentGiven?: boolean;
  _hp?: string;
}): Promise<boolean> {
  // Honeypot: bots fill hidden fields, real users never do
  if (data._hp) return true;
  const { _hp, ...payload } = data;
  return post({ type: 'lead', ...payload });
}

export async function submitConsent(data: {
  email: string;
  phone?: string;
  source: string;
}): Promise<boolean> {
  return post({
    type: 'consent',
    ...data,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    consentText:
      'I agree that Colitis Help USA may contact me by phone, text, or email and may share my information, including health-related responses, with selected healthcare providers, care-navigation partners, or service partners who may contact me about UC-related care options.',
  });
}
