import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '..', 'public', 'gi-questions-checklist.pdf');

const NAVY = '#0B2545';
const TEAL = '#0E6B8E';
const GOLD = '#C8902A';
const GRAY = '#5C5C56';
const LTEAL = '#E4F5F7';
const RED  = '#C0392B';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 55, bottom: 55, left: 60, right: 60 },
  info: {
    Title: '25 Questions to Ask Your GI Doctor — ColitisHelpUSA.com',
    Author: 'ColitisHelpUSA.com',
    Subject: 'UC GI Appointment Checklist',
  },
});
doc.pipe(fs.createWriteStream(out));

const PW = doc.page.width;
const PH = doc.page.height;
const L  = 60;
const W  = PW - 120;

// ── low-level helpers ────────────────────────────────────────────────────────

function setY(y) { doc.y = y; }

function drawRect(x, y, w, h, fill) {
  doc.rect(x, y, w, h).fill(fill);
}

function txt(text, x, y, opts, color, size, font) {
  doc.fillColor(color || GRAY).fontSize(size || 9.5).font(font || 'Helvetica')
     .text(text, x, y, { lineGap: 2, ...opts });
}

// ── page chrome ──────────────────────────────────────────────────────────────

function contentPageHeader(right) {
  drawRect(0, 0, PW, 36, NAVY);
  txt('ColitisHelpUSA.com  |  Educational — not medical advice', L, 12,
      { width: W - 80 }, 'rgba(255,255,255,0.6)', 8, 'Helvetica');
  if (right) {
    txt(right, L, 12, { width: W, align: 'right' },
        'rgba(255,255,255,0.6)', 8, 'Helvetica');
  }
  setY(50);
}

function pageTitle(text) {
  txt(text, L, doc.y, { width: W }, NAVY, 18, 'Helvetica-Bold');
  setY(doc.y + 10);
}

// ── content components ───────────────────────────────────────────────────────

function categoryHeader(label, color) {
  const y = doc.y + 6;
  drawRect(L, y, W, 28, color || TEAL);
  txt(label, L + 10, y + 8, { width: W - 20 }, 'white', 10.5, 'Helvetica-Bold');
  setY(y + 36);
}

function checkQ(text, note) {
  const y = doc.y;
  // gold checkbox
  doc.rect(L + 2, y + 2, 10, 10).strokeColor(GOLD).lineWidth(1.2).stroke();
  // question
  txt(text, L + 20, y, { width: W - 22 }, NAVY, 9.5, 'Helvetica-Bold');
  if (note) {
    const ny = doc.y + 1;
    txt(note, L + 20, ny, { width: W - 22 }, TEAL, 8.5, 'Helvetica-Oblique');
  }
  setY(doc.y + 9);
}

function tipBox(text) {
  const y = doc.y + 4;
  const h = doc.heightOfString(text, { width: W - 28, lineGap: 2 }) + 18;
  drawRect(L, y, W, h, LTEAL);
  drawRect(L, y, 5, h, TEAL);
  txt(text, L + 16, y + 9, { width: W - 28, lineGap: 2 }, '#0B2545', 9, 'Helvetica');
  setY(y + h + 8);
}

function warningBox(text) {
  const y = doc.y + 4;
  const h = doc.heightOfString(text, { width: W - 28, lineGap: 2 }) + 18;
  drawRect(L, y, W, h, '#FDECEA');
  drawRect(L, y, 5, h, RED);
  txt(text, L + 16, y + 9, { width: W - 28, lineGap: 2 }, RED, 9, 'Helvetica-Bold');
  setY(y + h + 8);
}

function divider() {
  const y = doc.y + 4;
  doc.moveTo(L, y).lineTo(L + W, y).strokeColor('#E8E8E4').lineWidth(0.8).stroke();
  setY(y + 10);
}

// ── COVER ────────────────────────────────────────────────────────────────────

drawRect(0, 0, PW, PH, NAVY);
drawRect(0, 0, PW, 8, GOLD);
drawRect(0, PH - 8, PW, 8, GOLD);

// brand
txt('ColitisHelpUSA.com', L, 36, { width: W }, 'rgba(255,255,255,0.7)', 11, 'Helvetica');

// icon block
drawRect(L, 78, 56, 56, TEAL);
drawRect(L, 78, 56, 12, NAVY);
txt('UC', L + 14, 84, {}, 'rgba(255,255,255,0.9)', 8, 'Helvetica-Bold');
// leaf shape hint
doc.moveTo(L + 28, 124).quadraticCurveTo(L + 14, 112, L + 16, 98)
   .quadraticCurveTo(L + 18, 85, L + 28, 87)
   .quadraticCurveTo(L + 38, 85, L + 40, 98)
   .quadraticCurveTo(L + 42, 112, L + 28, 124)
   .fill('rgba(255,255,255,0.9)');

// title
txt('25 Questions to Ask', L, 152, { width: W }, 'white', 34, 'Helvetica-Bold');
txt('Your GI Doctor', L, 193, { width: W }, GOLD, 34, 'Helvetica-Bold');

// subtitle
doc.moveTo(L, 240).lineTo(L + 340, 240).strokeColor(TEAL).lineWidth(1.5).stroke();
txt('Bring this checklist to every GI appointment and make the most of your visit.',
    L, 250, { width: W - 40 }, 'rgba(255,255,255,0.75)', 12, 'Helvetica');

// what's inside box
drawRect(L, 290, W, 170, 'rgba(255,255,255,0.07)');
drawRect(L, 290, 4, 170, GOLD);
txt("WHAT'S INSIDE", L + 16, 302, { width: W - 20 }, GOLD, 8.5, 'Helvetica-Bold');
const topics = [
  'About your current symptoms and flare severity',
  'Is your current medication working?',
  'When to step up to a biologic or JAK inhibitor',
  'Lab tests and monitoring you may need',
  'Diet, supplements, and exercise questions',
  'Long-term disease management and cancer risk',
  'How to ask about clinical trials and new therapies',
];
let ty2 = 320;
topics.forEach(t => {
  txt('-  ' + t, L + 16, ty2, { width: W - 24 }, 'rgba(255,255,255,0.85)', 9.5, 'Helvetica');
  ty2 += 20;
});

// disclaimer band
drawRect(0, PH - 64, PW, 56, '#071A32');
txt('MEDICAL DISCLAIMER: This checklist is for educational purposes only. It is not medical advice, diagnosis, or treatment. Never ignore professional medical advice or delay seeking it because of something in this document. Always consult a licensed gastroenterologist for decisions about your care.',
    L, PH - 56, { width: W, lineGap: 1.5 }, 'rgba(255,255,255,0.45)', 7.5, 'Helvetica');

// ── PAGE 2 — QUESTIONS 1-15 ──────────────────────────────────────────────────

doc.addPage();
contentPageHeader('Page 1 of 2');
pageTitle('Your 25-Question GI Doctor Checklist');

tipBox('Before your appointment: circle your TOP 5 questions based on what is most urgent for you right now. Your doctor cannot cover all 25 in one visit — prioritize.');

categoryHeader('SECTION 1 — YOUR CURRENT SYMPTOMS', TEAL);
checkQ('Do my current symptoms indicate I am in a flare — and how severe is it?');
checkQ('Do we need tests to confirm — stool sample, blood work, or a scope?');
checkQ('How do my current symptoms compare to previous flares?');
checkQ('Could this be a C. difficile infection rather than a UC flare?',
       'C. diff mimics a flare but requires completely different treatment.');
checkQ('Should I be checked for anemia given the blood in my stool?');
checkQ('Are my joint pain, skin rashes, or eye issues linked to my UC activity?');

divider();

categoryHeader('SECTION 2 — YOUR CURRENT MEDICATION', '#1B5E82');
checkQ('Is my current medication controlling my disease — or is it progressing?');
checkQ('Should we adjust my dose, change formulations, or add rectal therapy?',
       'Suppositories or enemas can help for left-sided or distal UC.');
checkQ('Is a short course of steroids (prednisone or budesonide) right for me now?');
checkQ('If I have needed steroids more than once this year, is my current treatment failing?');
checkQ('What monitoring labs do I need while on my current medication?',
       'Some drugs require regular blood tests, TB screening, or infection checks.');

divider();

categoryHeader('SECTION 3 — STEPPING UP TREATMENT', '#0D5273');
checkQ('Am I a candidate for a biologic — infliximab, adalimumab, vedolizumab, or ustekinumab?');
checkQ('Am I a candidate for a JAK inhibitor — tofacitinib or upadacitinib?');
checkQ('What is the difference between these options, and why would you choose one for me?');
checkQ('How fast could a new treatment start working?');
checkQ('Are there patient assistance programs if I cannot afford a biologic?',
       'Most biologic manufacturers offer copay cards and financial assistance.');

warningBox('IMPORTANT: Never stop or change your UC medication without speaking to your doctor first. Stopping suddenly can cause a severe flare or rebound.');

// ── PAGE 3 — QUESTIONS 16-25 + ADVICE ───────────────────────────────────────

doc.addPage();
contentPageHeader('Page 2 of 2');
pageTitle('Monitoring, Lifestyle & Long-Term Care');

categoryHeader('SECTION 4 — TESTS AND MONITORING', TEAL);
checkQ('What symptoms mean I should call your office urgently — same day?');
checkQ('What symptoms mean I should go to the emergency room?');
checkQ('Do I need a colonoscopy to assess current disease activity or check for dysplasia?');
checkQ('How often should I have a colonoscopy given my history and disease extent?');
checkQ('Should I track symptoms at home — and what exactly should I record?',
       'Track: stool frequency, blood present (yes/no), pain 1-10, energy level 1-10.');

divider();

categoryHeader('SECTION 5 — DIET AND LIFESTYLE', '#1B5E82');
checkQ('Should I see a registered dietitian who specializes in IBD?');
checkQ('Are there foods or supplements to avoid given my current medications?');
checkQ('Which supplements are safe and helpful for me — iron, vitamin D, B12, folate?');
checkQ('Is it safe to exercise during this flare? What level of activity is appropriate?');

divider();

categoryHeader('SECTION 6 — LONG-TERM MANAGEMENT', '#0D5273');
checkQ('Is my UC progressing — and how can tests tell us?');
checkQ('What are my options if I keep flaring on my current maintenance medication?');
checkQ('Should I consider a clinical trial for a newer UC therapy?');
checkQ('What is my long-term cancer surveillance plan given how long I have had UC?');
checkQ('What does remission look like for me — and how will we measure it?');

tipBox('How to use this checklist: Print it or open it on your phone. Before the appointment, tick the boxes next to your top questions. Hand the list to your doctor or nurse at the start of the visit so they can see what matters most to you.');

divider();

// mini disclaimer at bottom
txt('This checklist is for educational purposes only and is not a substitute for professional medical advice from a licensed gastroenterologist who knows your full medical history.',
    L, doc.y + 4, { width: W, lineGap: 1.5 }, 'rgba(0,0,0,0.35)', 8, 'Helvetica-Oblique');

// ── BACK COVER ───────────────────────────────────────────────────────────────

doc.addPage();
drawRect(0, 0, PW, PH, NAVY);
drawRect(0, 0, PW, 8, GOLD);
drawRect(0, PH - 8, PW, 8, GOLD);

txt('More free resources at', L, 110, { width: W, align: 'center' }, 'white', 18, 'Helvetica-Bold');
txt('colitishelpusa.com', L, 138, { width: W, align: 'center' }, GOLD, 26, 'Helvetica-Bold');

doc.moveTo(L + 80, 178).lineTo(L + W - 80, 178).strokeColor(TEAL).lineWidth(1).stroke();

const links = [
  ['UC Flare Survival Guide (Free PDF)',        'colitishelpusa.com/free-uc-flare-guide'],
  ['UC Treatment Comparison Guide',             'colitishelpusa.com/uc-treatment-comparison'],
  ['Biologics for UC — Full Plain-English Guide','colitishelpusa.com/blog/biologics-for-ulcerative-colitis'],
  ['JAK Inhibitors for UC',                     'colitishelpusa.com/blog/jak-inhibitors-ulcerative-colitis'],
  ['UC Insurance and Cost Coverage Guide',      'colitishelpusa.com/ulcerative-colitis-insurance-coverage'],
  ['Free UC Care Options Check (8 questions)',  'colitishelpusa.com/uc-care-options-check'],
];
let ly = 196;
links.forEach(([title, url]) => {
  txt(title, L, ly, { width: W, align: 'center' }, 'white', 10.5, 'Helvetica-Bold');
  ly += 15;
  txt(url, L, ly, { width: W, align: 'center' }, TEAL, 8.5, 'Helvetica');
  ly += 24;
});

txt('MEDICAL DISCLAIMER: This checklist is for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a licensed gastroenterologist before making any changes to your care.',
    L, PH - 72, { width: W, align: 'center', lineGap: 2 }, 'rgba(255,255,255,0.3)', 7.5, 'Helvetica-Oblique');

doc.end();
console.log('Written: public/gi-questions-checklist.pdf');
