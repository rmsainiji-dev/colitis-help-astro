import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '..', 'public', 'uc-treatment-comparison.pdf');

const NAVY  = '#0B2545';
const TEAL  = '#0E6B8E';
const GOLD  = '#C8902A';
const GRAY  = '#5C5C56';
const LTEAL = '#E4F5F7';
const LGOLD = '#F5E8C7';
const RED   = '#C0392B';
const GREEN = '#1B7A4E';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 55, bottom: 55, left: 60, right: 60 },
  info: {
    Title: 'UC Treatment Comparison Guide — ColitisHelpUSA.com',
    Author: 'ColitisHelpUSA.com',
    Subject: 'Ulcerative Colitis Treatment Options Compared',
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
  doc.fillColor(color || GRAY)
     .fontSize(size || 9.5)
     .font(font || 'Helvetica')
     .text(text, x, y, { lineGap: 2, ...opts });
}

function contentHeader(pageLabel) {
  drawRect(0, 0, PW, 36, NAVY);
  txt('UC Treatment Comparison Guide  |  ColitisHelpUSA.com  |  Educational — not medical advice',
      L, 12, { width: W - 60 }, 'rgba(255,255,255,0.55)', 8, 'Helvetica');
  if (pageLabel) {
    txt(pageLabel, L, 12, { width: W, align: 'right' }, 'rgba(255,255,255,0.55)', 8, 'Helvetica');
  }
  setY(50);
}

function sectionHeading(text, color) {
  const y = doc.y + 5;
  drawRect(L, y, W, 30, color || NAVY);
  txt(text, L + 10, y + 9, { width: W - 20 }, 'white', 11, 'Helvetica-Bold');
  setY(y + 38);
}

function infoBox(text) {
  const y = doc.y + 3;
  const h = doc.heightOfString(text, { width: W - 28, lineGap: 2 }) + 18;
  drawRect(L, y, W, h, LTEAL);
  drawRect(L, y, 5, h, TEAL);
  txt(text, L + 16, y + 9, { width: W - 28, lineGap: 2 }, NAVY, 9, 'Helvetica');
  setY(y + h + 8);
}

function goldBox(text) {
  const y = doc.y + 3;
  const h = doc.heightOfString(text, { width: W - 28, lineGap: 2 }) + 18;
  drawRect(L, y, W, h, LGOLD);
  drawRect(L, y, 5, h, GOLD);
  txt(text, L + 16, y + 9, { width: W - 28, lineGap: 2 }, NAVY, 9, 'Helvetica-Bold');
  setY(y + h + 8);
}

function warningBox(text) {
  const y = doc.y + 3;
  const h = doc.heightOfString(text, { width: W - 28, lineGap: 2 }) + 18;
  drawRect(L, y, W, h, '#FDECEA');
  drawRect(L, y, 5, h, RED);
  txt(text, L + 16, y + 9, { width: W - 28, lineGap: 2 }, RED, 9, 'Helvetica-Bold');
  setY(y + h + 8);
}

function divider() {
  const y = doc.y + 4;
  doc.moveTo(L, y).lineTo(L + W, y).strokeColor('#E0E0DA').lineWidth(0.7).stroke();
  setY(y + 10);
}

// Treatment card: name, badge color, how, severity, speed, pros[], cons[], ask
function treatmentCard(name, badgeText, badgeColor, how, severity, speed, pros, cons, ask) {
  // card top bar
  const y = doc.y + 5;
  drawRect(L, y, W, 26, NAVY);
  // badge pill on right
  const badgeW = 90;
  drawRect(L + W - badgeW - 6, y + 5, badgeW, 16, badgeColor || TEAL);
  txt(badgeText, L + W - badgeW - 3, y + 8, { width: badgeW - 4, align: 'center' },
      'white', 7.5, 'Helvetica-Bold');
  // treatment name
  txt(name, L + 10, y + 7, { width: W - badgeW - 20 }, 'white', 11, 'Helvetica-Bold');
  setY(y + 32);

  // details
  const row = (label, value, vc) => {
    const ry = doc.y;
    txt(label + ':', L + 4, ry, { width: 68 }, NAVY, 8.5, 'Helvetica-Bold');
    txt(value, L + 75, ry, { width: W - 77 }, vc || GRAY, 8.5, 'Helvetica');
    setY(Math.max(doc.y, ry + 12));
    doc.moveDown(0.1);
  };
  row('How taken',  how);
  row('Used for',   severity);
  row('How fast',   speed, TEAL);
  doc.moveDown(0.2);

  // pros
  txt('Advantages:', L + 4, doc.y, { width: W }, GREEN, 9, 'Helvetica-Bold');
  doc.moveDown(0.05);
  pros.forEach(p => {
    txt('   + ' + p, L + 4, doc.y, { width: W - 6, lineGap: 1 }, GREEN, 8.5, 'Helvetica');
  });
  doc.moveDown(0.2);

  // cons
  txt('Considerations:', L + 4, doc.y, { width: W }, '#8B4513', 9, 'Helvetica-Bold');
  doc.moveDown(0.05);
  cons.forEach(c => {
    txt('   - ' + c, L + 4, doc.y, { width: W - 6, lineGap: 1 }, GRAY, 8.5, 'Helvetica');
  });
  doc.moveDown(0.2);

  // ask your doctor
  const ay = doc.y;
  txt('Ask your doctor:', L + 4, ay, { width: 88 }, GOLD, 8.5, 'Helvetica-Bold');
  txt(ask, L + 96, ay, { width: W - 98, lineGap: 1 }, GRAY, 8.5, 'Helvetica-Oblique');
  setY(Math.max(doc.y, ay + 12));
  doc.moveDown(0.8);
}

// ── COVER ────────────────────────────────────────────────────────────────────

drawRect(0, 0, PW, PH, NAVY);
drawRect(0, 0, PW, 8, GOLD);
drawRect(0, PH - 8, PW, 8, GOLD);

// decorative circles
doc.circle(PW - 40, 190, 150).fill(TEAL).opacity(0.1);
doc.opacity(1);
doc.circle(40, PH - 100, 100).fill(TEAL).opacity(0.07);
doc.opacity(1);

txt('ColitisHelpUSA.com', L, 36, { width: W }, 'rgba(255,255,255,0.65)', 11, 'Helvetica');

txt('UC Treatment', L, 110, { width: W }, 'white', 38, 'Helvetica-Bold');
txt('Comparison Guide', L, 154, { width: W }, GOLD, 38, 'Helvetica-Bold');

doc.moveTo(L, 205).lineTo(L + 360, 205).strokeColor(TEAL).lineWidth(1.5).stroke();

txt('Plain-English comparisons of every major UC medication class — so you can have informed conversations with your gastroenterologist.',
    L, 215, { width: W - 30, lineGap: 3 }, 'rgba(255,255,255,0.75)', 12, 'Helvetica');

// content overview box
drawRect(L, 268, W, 178, 'rgba(255,255,255,0.06)');
drawRect(L, 268, 5, 178, GOLD);
txt('TREATMENTS COVERED IN THIS GUIDE', L + 16, 280, { width: W },
    GOLD, 8.5, 'Helvetica-Bold');

const classes = [
  ['Aminosalicylates (5-ASA)', 'Mesalamine, Sulfasalazine — first-line for mild-moderate UC'],
  ['Corticosteroids',          'Prednisone, Budesonide — for active flares, not long-term use'],
  ['Immunomodulators',         'Azathioprine, 6-MP — long-term maintenance option'],
  ['Anti-TNF Biologics',       'Infliximab, Adalimumab, Golimumab — inject or infuse'],
  ['Gut-Selective Biologic',   'Vedolizumab — targets the gut only, fewer systemic effects'],
  ['IL-12/23 Biologic',        'Ustekinumab — injection after IV loading dose'],
  ['JAK Inhibitors',           'Tofacitinib, Upadacitinib — oral pills, fast acting'],
];
let cy = 300;
classes.forEach(([cls, desc]) => {
  txt(cls, L + 16, cy, { width: 160 }, 'white', 9, 'Helvetica-Bold');
  txt(desc, L + 182, cy, { width: W - 182 }, 'rgba(255,255,255,0.65)', 9, 'Helvetica');
  cy += 20;
});

// disclaimer band
drawRect(0, PH - 64, PW, 56, '#071A32');
txt('MEDICAL DISCLAIMER: This guide is for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Never start, stop, or change a medication without guidance from your gastroenterologist. Individual treatment decisions depend on your full medical history.',
    L, PH - 56, { width: W, lineGap: 1.5 }, 'rgba(255,255,255,0.4)', 7.5, 'Helvetica-Oblique');

// ── PAGE 2 — 5-ASA + STEROIDS ────────────────────────────────────────────────

doc.addPage();
contentHeader('Section 1 of 4');
txt('Aminosalicylates and Corticosteroids', L, doc.y, { width: W }, NAVY, 16, 'Helvetica-Bold');
setY(doc.y + 10);

infoBox('UC treatment follows a "step-up" approach. Most patients start with aminosalicylates (5-ASA). If symptoms are not controlled, treatment steps up to immunomodulators, then biologics or JAK inhibitors. Corticosteroids are used to control active flares — not as long-term maintenance.');

sectionHeading('AMINOSALICYLATES (5-ASA) — First-Line Therapy', TEAL);

treatmentCard(
  'Mesalamine (Lialda, Asacol, Pentasa, Delzicol)',
  'FIRST-LINE', TEAL,
  'Oral tablets or capsules daily. Rectal suppositories or enemas for distal disease.',
  'Mild to moderate UC — the starting point for most newly diagnosed patients.',
  '2 to 8 weeks for full anti-inflammatory effect.',
  [
    'Well tolerated by most patients with few serious side effects',
    'Reduces relapse risk significantly when taken long-term and consistently',
    'Generally considered safe during pregnancy (discuss with your doctor)',
    'Multiple formulations: pills, suppositories, enemas — can target specific areas',
  ],
  [
    'Must be taken every day even during remission — skipping causes flares',
    'Not effective for moderate-severe disease or extensive colitis',
    'Rectal forms may be needed alongside oral for distal disease',
  ],
  'Am I getting the most from my current mesalamine dose and formulation? Should I add rectal therapy?'
);

treatmentCard(
  'Sulfasalazine (Azulfidine)',
  'ALTERNATIVE 5-ASA', '#1B5E82',
  'Oral tablets, usually 2-4 times daily with food.',
  'Mild to moderate UC. Also effective for UC-associated joint inflammation.',
  '4 to 8 weeks for full effect.',
  [
    'Lower cost than newer mesalamine formulations — often fully covered',
    'Helps joint symptoms that sometimes accompany UC',
    'Decades of safety data available',
  ],
  [
    'More side effects than newer 5-ASA: nausea, headache, sensitivity to sun',
    'Must take folic acid supplement alongside it',
    'Can reversibly reduce sperm count in men — discuss if planning a family',
  ],
  'Would sulfasalazine be a better fit given my budget and joint symptoms?'
);

sectionHeading('CORTICOSTEROIDS — Active Flare Control Only', '#7B3F00');

warningBox('Corticosteroids control flares but DO NOT maintain remission. Using them repeatedly is a signal that your maintenance treatment is not working. Discuss stepping up therapy with your doctor.');

treatmentCard(
  'Prednisone / Methylprednisolone',
  'FLARE CONTROL ONLY', '#8B4513',
  'Oral tablets (prednisone) or IV infusion (methylprednisolone) for hospitalized patients.',
  'Moderate to severe active UC flares. NOT appropriate for long-term maintenance.',
  'Days to 1-2 weeks for symptom relief.',
  [
    'Fast and effective at controlling active flares',
    'Available oral and IV — adaptable to flare severity',
    'Reduces inflammation quickly when other treatments need time to work',
  ],
  [
    'Significant side effects with prolonged use: weight gain, mood changes, bone loss, blood sugar rise, sleep disruption',
    'Relapse is common when stopping — does not maintain remission',
    'Needing steroids more than once a year means stronger maintenance therapy is needed',
  ],
  'If I need steroids again this year, does that mean we need to change my maintenance medication?'
);

treatmentCard(
  'Budesonide MMX (Uceris)',
  'LOWER-RISK STEROID', '#A0522D',
  'Extended-release oral tablet once daily. Releases in the colon specifically.',
  'Mild to moderate active UC. Fewer whole-body effects than prednisone.',
  '1 to 4 weeks.',
  [
    'Fewer systemic side effects — acts locally in the colon',
    'Less impact on blood sugar, bone density, and mood than prednisone',
    'Good option for patients who experience severe side effects from prednisone',
  ],
  [
    'Less potent than prednisone — may not control severe flares',
    'Still not appropriate for long-term maintenance',
    'More expensive than generic prednisone',
  ],
  'Would budesonide be safer than prednisone given my other health conditions?'
);

// ── PAGE 3 — IMMUNOMODULATORS + ANTI-TNF BIOLOGICS ───────────────────────────

doc.addPage();
contentHeader('Section 2 of 4');
txt('Immunomodulators and Anti-TNF Biologics', L, doc.y, { width: W }, NAVY, 16, 'Helvetica-Bold');
setY(doc.y + 10);

sectionHeading('IMMUNOMODULATORS — Long-Term Maintenance', '#0D5273');

infoBox('Immunomodulators work slowly — they take 3 to 6 months to reach full effect. They are never used alone for an active flare. They are most often combined with a biologic to prevent the body from developing antibodies against it.');

treatmentCard(
  'Azathioprine (Imuran) / 6-Mercaptopurine (6-MP)',
  'IMMUNOMODULATOR', TEAL,
  'Oral tablet taken once daily.',
  'Moderate UC maintenance. Often combined with a biologic medication.',
  'Very slow — 3 to 6 months for full therapeutic effect.',
  [
    'Can maintain remission long-term once it takes effect',
    'Lower cost than biologic medications',
    'Reduces antibody formation when used alongside biologics (combination therapy)',
  ],
  [
    'Cannot control an active flare — too slow',
    'Requires regular blood monitoring: complete blood count and liver function tests',
    'TPMT enzyme test required before starting to determine safe dosing',
    'Small increased infection risk with long-term use',
  ],
  'Should I be on an immunomodulator alongside my biologic to prevent antibody formation?'
);

divider();
sectionHeading('ANTI-TNF BIOLOGICS — Moderate to Severe UC', NAVY);

infoBox('Biologics are large-molecule medications made from living cells. They target specific proteins in the immune system. Anti-TNF biologics block Tumor Necrosis Factor-alpha, a key driver of gut inflammation in UC.');

treatmentCard(
  'Infliximab (Remicade, Inflectra, Renflexis, Avsola)',
  'ANTI-TNF BIOLOGIC', NAVY,
  'IV infusion at weeks 0, 2, and 6 (loading), then every 8 weeks for maintenance.',
  'Moderate to severe UC. Also used for steroid-dependent or steroid-refractory disease.',
  '2 to 6 weeks for initial response. Full effect assessed at week 14.',
  [
    'One of the most studied biologics in UC with decades of real-world data',
    'Used for both induction (bringing into remission) and maintenance',
    'Biosimilar versions (Inflectra, Renflexis, Avsola) available at significantly lower cost',
    'Can be used in hospitalized patients with severe flares via IV',
  ],
  [
    'IV infusion required at a clinic or infusion center every 6-8 weeks',
    'Can develop antibodies over time, reducing effectiveness (combination with immunomodulator helps)',
    'TB screening, hepatitis B test, and infection screening required before starting',
    'Not for patients with certain infections, moderate-severe heart failure, or multiple sclerosis',
  ],
  'Is infliximab still the right biologic for me, or should we try a different target?'
);

treatmentCard(
  'Adalimumab (Humira, Hadlima) / Golimumab (Simponi)',
  'ANTI-TNF BIOLOGIC', '#0D4F7A',
  'Self-injected at home. Adalimumab: every 2 weeks. Golimumab: once monthly.',
  'Moderate to severe UC.',
  '4 to 12 weeks for meaningful clinical response.',
  [
    'Self-injection at home — no clinic visits required for infusions',
    'Adalimumab widely available in biosimilar form at lower cost',
    'Golimumab offers once-monthly dosing — convenient for some patients',
    'Good option for patients who want independence from infusion scheduling',
  ],
  [
    'Antibody formation possible — may lose effectiveness over time',
    'TB and infection screening required before starting',
    'Injection site reactions possible, especially at the start',
  ],
  'Would a self-injectable anti-TNF fit better with my schedule than a clinic infusion?'
);

// ── PAGE 4 — GUT-SELECTIVE + JAK INHIBITORS ──────────────────────────────────

doc.addPage();
contentHeader('Section 3 of 4');
txt('Gut-Selective and Newer Biologic Therapies', L, doc.y, { width: W }, NAVY, 16, 'Helvetica-Bold');
setY(doc.y + 10);

sectionHeading('GUT-SELECTIVE AND IL-12/23 BIOLOGICS', '#1B5E82');

treatmentCard(
  'Vedolizumab (Entyvio)',
  'GUT-SELECTIVE', '#1B5E82',
  'IV infusion every 8 weeks (loading at 0, 2, 6 weeks). Subcutaneous injection form available.',
  'Moderate to severe UC. Preferred when systemic infection risk is a concern.',
  'Slower than anti-TNF — meaningful response at 6 to 14 weeks.',
  [
    'Gut-selective mechanism: acts only in the gastrointestinal tract, not the whole immune system',
    'Lower risk of serious systemic infections compared to anti-TNF biologics',
    'Good choice for patients with prior cancers, recurrent infections, or older patients',
    'Subcutaneous injection form now available for home administration',
  ],
  [
    'Slower onset than anti-TNF — not ideal if rapid response is needed',
    'Less effective for extraintestinal manifestations like joint pain or skin involvement',
    'IV infusion clinic visits required unless using the injection form',
  ],
  'Given my health history, is vedolizumab safer for me than an anti-TNF biologic?'
);

treatmentCard(
  'Ustekinumab (Stelara)',
  'IL-12/23 BIOLOGIC', '#2E4057',
  'Single IV loading dose based on weight, then subcutaneous injection every 8 to 12 weeks.',
  'Moderate to severe UC. Also approved for Crohn\'s disease.',
  '4 to 8 weeks after the IV loading dose for initial response.',
  [
    'Very convenient after loading: only 4 to 6 injections per year',
    'Favorable safety profile — lower infection risk than anti-TNF',
    'Effective for patients who have failed or lost response to anti-TNF biologics',
    'Also covers skin and joint manifestations of UC',
  ],
  [
    'Requires an IV infusion for the first loading dose',
    'Insurance prior authorization is often required and may take time',
    'Less data than older biologics, though the evidence base is growing rapidly',
  ],
  'Is ustekinumab a good next step after failing my current biologic?'
);

divider();
sectionHeading('JAK INHIBITORS — Oral Small-Molecule Therapies', GOLD);

infoBox('JAK inhibitors are oral pills — no injections or infusions. They work by blocking Janus kinase enzymes inside cells, reducing the inflammatory signals that drive UC. They generally work faster than biologics.');

warningBox('BLACK BOX WARNING (FDA): JAK inhibitors carry an increased risk of serious infections, blood clots, major cardiac events, and certain cancers — particularly at higher doses. They are not recommended for patients over 65, smokers, or those with cardiovascular risk factors unless no alternatives exist. Discuss your personal risk with your doctor.');

treatmentCard(
  'Tofacitinib (Xeljanz)',
  'JAK1/3 INHIBITOR', GOLD,
  'Oral tablet twice daily (induction). Extended-release once daily for maintenance.',
  'Moderate to severe UC. FDA-approved. Used after 5-ASA failure or biologic failure.',
  'Fast — clinical response often within 2 to 4 weeks.',
  [
    'Oral pill — no injections or infusions needed',
    'Fast onset of action — one of the quickest UC treatments available',
    'Effective for patients who have failed multiple biologics',
  ],
  [
    'FDA black box warning for infections, blood clots, cardiovascular events, malignancy at high dose',
    'Not recommended for patients over 65 or with significant cardiovascular risk',
    'Requires monitoring: lipid panel, CBC, liver function tests',
    'Herpes zoster (shingles) vaccination recommended before starting',
  ],
  'Given my age and cardiovascular history, is tofacitinib safe and appropriate for me?'
);

treatmentCard(
  'Upadacitinib (Rinvoq)',
  'JAK1-SELECTIVE', '#B07D00',
  'Oral extended-release tablet once daily (higher induction dose, lower maintenance dose).',
  'Moderate to severe UC. Also approved for Crohn\'s disease.',
  'Fast — response often within 2 to 4 weeks of starting induction dose.',
  [
    'Once-daily oral dosing — simple regimen',
    'More selective for JAK1 than tofacitinib — potentially more targeted',
    'Strong remission rates even in patients who failed previous biologics',
    'Approved for both UC and Crohn\'s disease',
  ],
  [
    'Same FDA black box warnings as tofacitinib',
    'Acne is a common and frequently reported side effect',
    'Requires regular laboratory monitoring',
    'Insurance prior authorization required in most cases',
  ],
  'How does upadacitinib compare to biologics for my specific disease severity and history?'
);

// ── PAGE 5 — COMPARISON TABLE + DISCLAIMERS ──────────────────────────────────

doc.addPage();
contentHeader('Section 4 of 4');
txt('Quick-Reference Comparison Table', L, doc.y, { width: W }, NAVY, 16, 'Helvetica-Bold');
setY(doc.y + 6);

txt('Use this table as a conversation starter with your gastroenterologist — not as a guide to self-prescribe.',
    L, doc.y, { width: W }, GRAY, 9.5, 'Helvetica-Oblique');
setY(doc.y + 12);

// table
const cols = [148, 72, 64, 80, 98];
const colHeaders = ['Medication Class', 'Route', 'Speed', 'Best Suited For', 'Key Watch-Out'];
let tx = L;
const tHdrY = doc.y + 2;
drawRect(L, tHdrY, W, 24, NAVY);
colHeaders.forEach((h, i) => {
  txt(h, tx + 3, tHdrY + 6, { width: cols[i] - 6 }, 'white', 7.5, 'Helvetica-Bold');
  tx += cols[i];
});

const rows = [
  ['Mesalamine (5-ASA)',      'Oral / Rectal', '2-8 weeks',    'Mild-Moderate',    'Take every single day'],
  ['Sulfasalazine',           'Oral',          '4-8 weeks',    'Mild-Mod + joints','Folic acid needed'],
  ['Corticosteroids',         'Oral / IV',     'Days',         'Active flares only','Not long-term'],
  ['Immunomodulators',        'Oral daily',    '3-6 months',   'Maintenance combo', 'Blood monitoring'],
  ['Infliximab (anti-TNF)',   'IV infusion',   '2-6 weeks',    'Moderate-Severe',   'Antibody formation'],
  ['Adalimumab (anti-TNF)',   'Injection',     '4-12 weeks',   'Moderate-Severe',   'Home injection'],
  ['Vedolizumab',             'IV / Inject',   '6-14 weeks',   'Gut-targeted',      'Slower onset'],
  ['Ustekinumab',             'IV then inject','4-8 weeks',    'Post-anti-TNF',     'Auth needed'],
  ['Tofacitinib (JAK)',       'Oral daily',    '2-4 weeks',    'After biologic fail','Cardiac/clot risk'],
  ['Upadacitinib (JAK)',      'Oral daily',    '2-4 weeks',    'Moderate-Severe',   'Cardiac/clot risk'],
];

let rowY = tHdrY + 24;
rows.forEach((row, ri) => {
  const bg = ri % 2 === 0 ? '#F4F4F2' : 'white';
  drawRect(L, rowY, W, 22, bg);
  doc.rect(L, rowY, W, 22).strokeColor('#E0E0DA').lineWidth(0.5).stroke();
  tx = L;
  row.forEach((cell, ci) => {
    txt(cell, tx + 3, rowY + 6, { width: cols[ci] - 6 }, ci === 0 ? NAVY : GRAY,
        8, ci === 0 ? 'Helvetica-Bold' : 'Helvetica');
    tx += cols[ci];
  });
  rowY += 22;
});

setY(rowY + 12);

goldBox('IMPORTANT: The "right" medication depends on your disease extent, prior treatments, other health conditions, insurance coverage, and your personal preferences. This table is a starting point for an informed conversation — not a prescription guide.');

infoBox('Prior Authorization (PA): Most insurance plans require a PA for biologics and JAK inhibitors before they will cover the cost. Your GI office handles the paperwork — but ask them how long it typically takes so you can plan your treatment timeline.');

divider();

// summary box
const sy = doc.y + 2;
drawRect(L, sy, W, 68, LTEAL);
drawRect(L, sy, 5, 68, TEAL);
txt('Questions to bring to your next appointment:', L + 16, sy + 8, { width: W - 22 }, NAVY, 9, 'Helvetica-Bold');
const qs = [
  'Is my current treatment controlling my UC — or is my disease progressing?',
  'Am I a candidate for a biologic or JAK inhibitor based on my disease severity?',
  'What treatment would you recommend for someone with my exact history?',
  'How do we measure success — and how will I know if it is working?',
];
let qy = sy + 22;
qs.forEach(q => {
  txt('-  ' + q, L + 16, qy, { width: W - 22, lineGap: 1 }, GRAY, 8.5, 'Helvetica');
  qy += 14;
});
setY(sy + 76);

warningBox('MEDICAL DISCLAIMER: This guide is for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Never start, stop, or change a UC medication without guidance from your gastroenterologist. Side effects, contraindications, and interactions vary — your doctor knows your complete medical history and is the right person to guide your treatment decisions.');

// ── BACK COVER ───────────────────────────────────────────────────────────────

doc.addPage();
drawRect(0, 0, PW, PH, NAVY);
drawRect(0, 0, PW, 8, GOLD);
drawRect(0, PH - 8, PW, 8, GOLD);

doc.circle(PW - 40, 180, 150).fill(TEAL).opacity(0.08);
doc.opacity(1);

txt('More free resources at', L, 108, { width: W, align: 'center' }, 'white', 18, 'Helvetica-Bold');
txt('colitishelpusa.com', L, 136, { width: W, align: 'center' }, GOLD, 26, 'Helvetica-Bold');
doc.moveTo(L + 80, 175).lineTo(L + W - 80, 175).strokeColor(TEAL).lineWidth(1).stroke();

const backLinks = [
  ['UC Flare Survival Guide (Free PDF)',           'colitishelpusa.com/free-uc-flare-guide'],
  ['25 Questions to Ask Your GI Doctor (Checklist)','colitishelpusa.com/gi-doctor-questions'],
  ['Biologics for UC — Full Plain-English Guide',  'colitishelpusa.com/blog/biologics-for-ulcerative-colitis'],
  ['JAK Inhibitors for UC',                        'colitishelpusa.com/blog/jak-inhibitors-ulcerative-colitis'],
  ['UC Insurance and Cost Coverage Guide',         'colitishelpusa.com/ulcerative-colitis-insurance-coverage'],
  ['Free UC Care Options Check (8 questions)',     'colitishelpusa.com/uc-care-options-check'],
];
let bly = 192;
backLinks.forEach(([title, url]) => {
  txt(title, L, bly, { width: W, align: 'center' }, 'white', 10.5, 'Helvetica-Bold');
  bly += 15;
  txt(url, L, bly, { width: W, align: 'center' }, TEAL, 8.5, 'Helvetica');
  bly += 24;
});

txt('MEDICAL DISCLAIMER: This guide is for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a licensed gastroenterologist for decisions about your UC care.',
    L, PH - 70, { width: W, align: 'center', lineGap: 2 }, 'rgba(255,255,255,0.3)', 7.5, 'Helvetica-Oblique');

doc.end();
console.log('Written: public/uc-treatment-comparison.pdf');
