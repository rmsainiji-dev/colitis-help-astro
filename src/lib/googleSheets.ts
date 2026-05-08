import { google } from 'googleapis';
import { Lead, NewsletterSubscriber, ConsentRecord } from '@/types/lead';

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheetsClient() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

export async function appendLead(lead: Lead): Promise<void> {
  const sheets = getSheetsClient();
  const row = [
    lead.timestamp,
    lead.leadScore,
    lead.name,
    lead.email,
    lead.phone,
    lead.state,
    lead.zipCode,
    lead.bestContactTime,
    lead.symptoms,
    lead.diagnosisStatus,
    lead.currentTreatment,
    lead.symptomSeverity,
    lead.insurance,
    lead.source,
    lead.consentGiven,
    lead.consentTimestamp,
    lead.ipAddress,
    lead.status,
    lead.notes,
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Leads!A:S',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

export async function appendNewsletterSubscriber(sub: NewsletterSubscriber): Promise<void> {
  const sheets = getSheetsClient();
  const row = [sub.timestamp, sub.email, sub.name, sub.source];
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Newsletter!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

export async function appendConsentRecord(record: ConsentRecord): Promise<void> {
  const sheets = getSheetsClient();
  const row = [record.timestamp, record.email, record.source, record.consentText, record.ipAddress];
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'ConsentLog!A:E',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}
