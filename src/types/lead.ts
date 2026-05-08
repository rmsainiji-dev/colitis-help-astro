export interface Lead {
  timestamp: string;
  leadScore: 'High' | 'Medium' | 'Low';
  name: string;
  email: string;
  phone: string;
  state: string;
  zipCode: string;
  bestContactTime: string;
  symptoms: string;
  diagnosisStatus: string;
  currentTreatment: string;
  symptomSeverity: string;
  insurance: string;
  source: string;
  consentGiven: string;
  consentTimestamp: string;
  ipAddress: string;
  status: string;
  notes: string;
}

export interface NewsletterSubscriber {
  timestamp: string;
  email: string;
  name: string;
  source: string;
}

export interface ConsentRecord {
  timestamp: string;
  email: string;
  source: string;
  consentText: string;
  ipAddress: string;
}
