import { appendConsentRecord } from './googleSheets';

export async function logConsent(opts: {
  email: string;
  source: string;
  ip: string;
}): Promise<void> {
  const consentText =
    'I agree that Colitis Help USA may contact me by phone, text, or email and may share my information, including health-related responses, with selected healthcare providers, care-navigation partners, or service partners who may contact me about UC-related care options. Consent is not required to use this website. Message and data rates may apply.';

  await appendConsentRecord({
    timestamp: new Date().toISOString(),
    email: opts.email,
    source: opts.source,
    consentText,
    ipAddress: opts.ip,
  });
}
