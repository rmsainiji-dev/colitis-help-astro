import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '..', 'public', 'uc-care-options-guide.pdf');

const NAVY  = '#0B2545';
const TEAL  = '#0E6B8E';
const GOLD  = '#C8902A';
const GRAY  = '#5C5C56';
const LTEAL = '#E4F5F7';
const GREEN = '#1B7A4E';
const RED   = '#C0392B';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 55, bottom: 55, left: 60, right: 60 },
  info: {
    Title: 'Your UC Care Options Guide — ColitisHelpUSA.com',
    Author: 'ColitisHelpUSA.com',
    Subject: 'Understanding UC care options and preparing for your GI appointment',
  },
});
doc.pipe(fs.createWriteStream(out));

const PW = doc.page.width;
const PH = doc.page.height;
const L  = 60;
const W  = PW - 120;

// ── helpers ──────────────────────────────────────────────────────────────────

function setY(y) { doc.y = y; }

function drawRect(x, y, w, h, fill) {
  doc.rect(x, y, w, h).fill(fill);
}

function txt(text, x, y, opts, color, size, font) {
  doc.fillColor(color || GRAY).fontSize(size || 9.5).font(font || 'Helvetica')
     .text(text, x, y, { lineGap: 2, ...opts });
}

function contentPageHeader(right) {
  drawRect(0, 0, PW, 36, NAVY);
  txt('ColitisHelpUSA.com  |  Educational — not medical advice', L, 12,
      { width: W - 80 }, 'rgba(255,255,255,0.6)', 8, 'Helvetica');
  if (right) {
    txt(right, L, 12, { width: W, align: 'right' },
        'rgba(255,255,255,0.6)', 8, 'Helvetica');
  }
  setY(52);
}

function sectionHeader(label, color) {
  const y = doc.y + 8;
  drawRect(L, y, W, 28, color || TEAL);
  txt(label, L + 12, y + 8, { width: W - 20 }, 'white', 10.5, 'Helvetica-Bold');
  setY(y + 36);
}

function bulletItem(symbol, text, note) {
  const y = doc.y;
  txt(symbol, L + 2, y, { width: 14 }, GOLD, 10, 'Helvetica-Bold');
  txt(text, L + 20, y, { width: W - 22 }, NAVY, 9.5, 'Helvetica-Bold');
  if (note) {
    txt(note, L + 20, doc.y + 1, { width: W - 22 }, GRAY, 9, 'Helvetica');
  }
  setY(doc.y + 8);
}

function infoBox(text, bg, accent) {
  const y = doc.y + 6;
  const h = doc.heightOfString(text, { width: W - 28, lineGap: 2 }) + 18;
  drawRect(L, y, W, h, bg || LTEAL);
  drawRect(L, y, 5, h, accent || TEAL);
  txt(text, L + 16, y + 9, { width: W - 28, lineGap: 2 }, NAVY, 9, 'Helvetica');
  setY(y + h + 10);
}

function warningBox(text) {
  const y = doc.y + 6;
  const h = doc.heightOfString(text, { width: W - 28, lineGap: 2 }) + 18;
  drawRect(L, y, W, h, '#FDECEA');
  drawRect(L, y, 5, h, RED);
  txt(text, L + 16, y + 9, { width: W - 28, lineGap: 2 }, RED, 9, 'Helvetica-Bold');
  setY(y + h + 10);
}

function twoColRow(left, right) {
  const y = doc.y;
  const colW = (W - 16) / 2;
  txt(left, L, y, { width: colW }, NAVY, 9.5, 'Helvetica-Bold');
  txt(right, L + colW + 16, y, { width: colW }, GRAY, 9.5, 'Helvetica');
  setY(doc.y + 10);
}

function divider() {
  const y = doc.y + 4;
  doc.moveTo(L, y).lineTo(L + W, y).strokeColor('#E8E8E4').lineWidth(0.8).stroke();
  setY(y + 12);
}

// ── COVER ────────────────────────────────────────────────────────────────────

drawRect(0, 0, PW, PH, NAVY);
drawRect(0, 0, PW, 8, GOLD);
drawRect(0, PH - 8, PW, 8, GOLD);

txt('ColitisHelpUSA.com', L, 36, { width: W }, 'rgba(255,255,255,0.7)', 11, 'Helvetica');

// Icon
drawRect(L, 78, 56, 56, TEAL);
drawRect(L, 78, 56, 12, NAVY);
txt('UC', L + 14, 84, {}, 'rgba(255,255,255,0.9)', 8, 'Helvetica-Bold');
doc.moveTo(L + 28, 124).quadraticCurveTo(L + 14, 112, L + 16, 98)
   .quadraticCurveTo(L + 18, 85, L + 28, 87)
   .quadraticCurveTo(L + 38, 85, L + 40, 98)
   .quadraticCurveTo(L + 42, 112, L + 28, 124)
   .fill('rgba(255,255,255,0.9)');

// Title
txt('Your UC Care Options Guide', L, 152, { width: W }, 'white', 28, 'Helvetica-Bold');
txt('Getting the most from your next GI appointment', L, 190, { width: W }, GOLD, 14, 'Helvetica');

doc.moveTo(L, 218).lineTo(L + 340, 218).strokeColor(TEAL).lineWidth(1.5).stroke();

txt('You completed the UC Care Options Check. This guide explains\nyour treatment options, what remission means, warning signs to\nwatch for, and the questions to bring to your doctor.',
    L, 228, { width: W - 40, lineGap: 4 }, 'rgba(255,255,255,0.75)', 11, 'Helvetica');

// What's inside box
drawRect(L, 292, W, 168, 'rgba(255,255,255,0.07)');
drawRect(L, 292, 4, 168, GOLD);
txt("WHAT'S INSIDE", L + 16, 304, { width: W - 20 }, GOLD, 8.5, 'Helvetica-Bold');
const topics = [
  'Understanding your UC care options at a glance',
  'What mild, moderate, and severe UC means for treatment',
  'Signs your current treatment may need to change',
  'What remission actually means — and the different types',
  '10 focused questions to ask your GI doctor',
  'Emergency warning signs you should never ignore',
];
let ty = 322;
topics.forEach(t => {
  txt('—  ' + t, L + 16, ty, { width: W - 24 }, 'rgba(255,255,255,0.85)', 9.5, 'Helvetica');
  ty += 22;
});

// Disclaimer band
drawRect(0, PH - 64, PW, 56, '#071A32');
txt('MEDICAL DISCLAIMER: This guide is for educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a licensed gastroenterologist for decisions about your care.',
    L, PH - 56, { width: W, lineGap: 1.5 }, 'rgba(255,255,255,0.45)', 7.5, 'Helvetica');

// ── PAGE 2 — CARE OPTIONS + REMISSION ────────────────────────────────────────

doc.addPage();
contentPageHeader('Page 1 of 2');

// Treatment ladder
sectionHeader('UNDERSTANDING YOUR UC TREATMENT OPTIONS', TEAL);

infoBox('UC treatment follows a step-up approach. Most patients start with aminosalicylates (5-ASA). If those do not control symptoms, treatment is stepped up. Your doctor chooses based on disease severity, test results, and your response to previous medications.', LTEAL, TEAL);

txt('TREATMENT AT A GLANCE', L, doc.y + 4, { width: W }, NAVY, 9, 'Helvetica-Bold');
setY(doc.y + 10);

// Header row
drawRect(L, doc.y, W, 20, NAVY);
txt('Treatment', L + 8, doc.y + 5, { width: 160 }, 'white', 8.5, 'Helvetica-Bold');
txt('Used For', L + 178, doc.y - 15, { width: 160 }, 'white', 8.5, 'Helvetica-Bold');
txt('Route', L + 350, doc.y - 15, { width: 70 }, 'white', 8.5, 'Helvetica-Bold');
setY(doc.y + 22);

const rows = [
  ['Mesalamine (5-ASA)', 'Mild to moderate UC — first-line', 'Oral / rectal'],
  ['Corticosteroids', 'Short-term flare control only', 'Oral / IV'],
  ['Immunomodulators', 'Maintenance with biologic', 'Oral'],
  ['Biologics (TNF, vedolizumab, etc.)', 'Moderate to severe UC', 'Injection / infusion'],
  ['JAK Inhibitors (tofacitinib, etc.)', 'Moderate to severe — oral option', 'Oral pill'],
];
rows.forEach((row, i) => {
  const bg = i % 2 === 0 ? '#F7F7F5' : '#ffffff';
  const rowH = 20;
  drawRect(L, doc.y, W, rowH, bg);
  txt(row[0], L + 8, doc.y + 5, { width: 160 }, NAVY, 8.5, 'Helvetica-Bold');
  txt(row[1], L + 178, doc.y - rowH + 5, { width: 160 }, GRAY, 8.5, 'Helvetica');
  txt(row[2], L + 350, doc.y - rowH + 5, { width: 80 }, TEAL, 8.5, 'Helvetica');
  setY(doc.y + rowH);
});

divider();

// Remission section
sectionHeader('WHAT REMISSION MEANS IN UC', GREEN);

const remissionTypes = [
  ['Clinical remission', 'Symptoms improve significantly or stop — fewer bathroom trips, no blood, less pain.'],
  ['Endoscopic remission', 'Inflammation is no longer visible on colonoscopy even if you feel better.'],
  ['Histologic remission', 'No microscopic inflammation found in biopsy tissue samples.'],
  ['Deep remission', 'All of the above combined — the strongest treatment goal with the best outcomes.'],
];
remissionTypes.forEach(([term, desc]) => {
  twoColRow(term, desc);
});

infoBox('Feeling better is important — but endoscopic remission (confirmed by scope) is now a primary goal of modern UC treatment, because silent inflammation can still cause damage over time.', '#E8F5F0', GREEN);

divider();

// Signs treatment may need to change
sectionHeader('SIGNS YOUR TREATMENT MAY NEED TO CHANGE', '#8B1A1A');

bulletItem('▸', 'Ongoing blood in stool despite taking medication as prescribed');
bulletItem('▸', 'Symptoms returning after a period of feeling well');
bulletItem('▸', 'Needing steroids more than once in a 12-month period',
           'This pattern is called steroid-dependence and is a signal to step up treatment.');
bulletItem('▸', 'Symptoms waking you up at night regularly');
bulletItem('▸', 'Significant weight loss or worsening fatigue');
bulletItem('▸', 'Feeling unable to work, travel, or socialize because of symptoms');

// ── PAGE 3 — QUESTIONS + WARNING SIGNS ───────────────────────────────────────

doc.addPage();
contentPageHeader('Page 2 of 2');

sectionHeader('10 QUESTIONS TO BRING TO YOUR GI APPOINTMENT', TEAL);

infoBox('You do not need to ask all 10. Before your appointment, circle your top 3–5 based on what is most relevant to your current situation.', LTEAL, TEAL);

const questions = [
  ['Are my current symptoms indicating active disease — or am I in remission?', null],
  ['What tests can confirm whether I have inflammation right now?',
   'Blood markers (CRP, ESR), fecal calprotectin, or a scope.'],
  ['Is my current medication working — and do we need to change it?', null],
  ['Am I steroid-dependent? And if so, what is the plan to get off steroids?', null],
  ['Am I a candidate for a biologic or JAK inhibitor?',
   'Ask about TNF inhibitors, vedolizumab, ustekinumab, tofacitinib, upadacitinib.'],
  ['How will we know when I am in remission?',
   'Ask about the target: clinical, endoscopic, or deep remission.'],
  ['What should I track between appointments?',
   'Stool frequency, blood (yes/no), pain 1–10, energy 1–10.'],
  ['Are there patient assistance programs to help with medication costs?', null],
  ['What symptoms should prompt an urgent call to your office?', null],
  ['Should I see a dietitian or discuss a clinical trial?', null],
];

questions.forEach(([q, note], i) => {
  const y = doc.y;
  doc.rect(L + 2, y + 3, 11, 11).strokeColor(GOLD).lineWidth(1.2).stroke();
  txt((i + 1) + '.', L + 3, y + 3, { width: 14 }, GOLD, 8, 'Helvetica-Bold');
  txt(q, L + 22, y, { width: W - 24 }, NAVY, 9.5, 'Helvetica-Bold');
  if (note) {
    txt(note, L + 22, doc.y + 1, { width: W - 24 }, TEAL, 8.5, 'Helvetica-Oblique');
  }
  setY(doc.y + 9);
});

divider();

// Emergency warning signs
sectionHeader('EMERGENCY WARNING SIGNS — SEEK CARE IMMEDIATELY', '#8B1A1A');

warningBox('Go to the emergency room or call 911 if you experience: heavy rectal bleeding that is not slowing down, severe abdominal pain, high fever (above 101°F / 38.5°C) with worsening symptoms, dizziness or fainting, rapid heartbeat, or inability to keep fluids down.');

const callOffice = [
  'New or increased blood in stool',
  'Significantly more bathroom trips than your normal',
  'Fever without obvious cause',
  'Symptoms waking you up at night for multiple nights in a row',
  'Feeling too weak or unwell to manage daily tasks',
];
txt('Call your GI office the same day for:', L, doc.y + 4, { width: W }, NAVY, 9.5, 'Helvetica-Bold');
setY(doc.y + 10);
callOffice.forEach(item => {
  txt('→  ' + item, L + 10, doc.y, { width: W - 12 }, GRAY, 9.5, 'Helvetica');
  setY(doc.y + 4);
});

divider();

txt('This guide is for educational purposes only and is not a substitute for professional medical advice from a licensed gastroenterologist who knows your full medical history.',
    L, doc.y + 4, { width: W, lineGap: 1.5 }, 'rgba(0,0,0,0.35)', 8, 'Helvetica-Oblique');

// ── BACK COVER ────────────────────────────────────────────────────────────────

doc.addPage();
drawRect(0, 0, PW, PH, NAVY);
drawRect(0, 0, PW, 8, GOLD);
drawRect(0, PH - 8, PW, 8, GOLD);

txt('More free resources at', L, 110, { width: W, align: 'center' }, 'white', 18, 'Helvetica-Bold');
txt('colitishelpusa.com', L, 138, { width: W, align: 'center' }, GOLD, 26, 'Helvetica-Bold');

doc.moveTo(L + 80, 178).lineTo(L + W - 80, 178).strokeColor(TEAL).lineWidth(1).stroke();

const links = [
  ['25 Questions to Ask Your GI Doctor (Free PDF)',   'colitishelpusa.com/gi-doctor-questions'],
  ['UC Flare Survival Guide (Free PDF)',              'colitishelpusa.com/free-uc-flare-guide'],
  ['UC Treatment Comparison Guide (Free PDF)',        'colitishelpusa.com/uc-treatment-comparison'],
  ['Biologics for UC — Plain-English Guide',         'colitishelpusa.com/blog/biologics-for-ulcerative-colitis'],
  ['JAK Inhibitors for UC',                          'colitishelpusa.com/blog/jak-inhibitors-ulcerative-colitis'],
  ['UC Remission: Types and How Long It Lasts',      'colitishelpusa.com/blog/ulcerative-colitis-remission'],
];
let ly = 196;
links.forEach(([title, url]) => {
  txt(title, L, ly, { width: W, align: 'center' }, 'white', 10.5, 'Helvetica-Bold');
  ly += 15;
  txt(url, L, ly, { width: W, align: 'center' }, TEAL, 8.5, 'Helvetica');
  ly += 24;
});

txt('MEDICAL DISCLAIMER: This guide is for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a licensed gastroenterologist before making any changes to your care.',
    L, PH - 72, { width: W, align: 'center', lineGap: 2 }, 'rgba(255,255,255,0.3)', 7.5, 'Helvetica-Oblique');

doc.end();
console.log('Written: public/uc-care-options-guide.pdf');
