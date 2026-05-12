import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'public', 'uc-flare-guide.pdf');

const NAVY  = '#0B2545';
const TEAL  = '#0E6B8E';
const GOLD  = '#C8902A';
const GRAY  = '#5C5C56';
const LIGHT = '#E4F5F7';
const RED   = '#C0392B';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 60, bottom: 60, left: 65, right: 65 },
  info: {
    Title: 'UC Flare Survival Guide — ColitisHelpUSA.com',
    Author: 'ColitisHelpUSA.com',
    Subject: 'Ulcerative Colitis Flare Management — Educational Guide',
    Keywords: 'ulcerative colitis, UC flare, IBD, diet, symptoms',
  },
});

doc.pipe(fs.createWriteStream(outputPath));

const W = doc.page.width - 130; // usable width

// ─── helpers ───────────────────────────────────────────────────────────────

function sectionTitle(text) {
  doc.moveDown(1.2);
  doc
    .rect(65, doc.y, W, 30)
    .fill(NAVY);
  doc
    .fillColor('white')
    .fontSize(13)
    .font('Helvetica-Bold')
    .text(text, 75, doc.y - 24, { width: W - 20 });
  doc.fillColor(GRAY).moveDown(0.8);
}

function subTitle(text) {
  doc.moveDown(0.6);
  doc
    .fillColor(TEAL)
    .fontSize(11)
    .font('Helvetica-Bold')
    .text(text);
  doc.fillColor(GRAY).moveDown(0.2);
}

function body(text) {
  doc
    .fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text(text, { lineGap: 3 });
  doc.moveDown(0.3);
}

function bullet(text) {
  doc
    .fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text(`• ${text}`, { indent: 12, lineGap: 2 });
}

function warningBox(text) {
  const y = doc.y + 6;
  doc
    .rect(65, y, W, 36)
    .fill('#FDECEA');
  doc
    .rect(65, y, 4, 36)
    .fill(RED);
  doc
    .fillColor(RED)
    .fontSize(9.5)
    .font('Helvetica-Bold')
    .text(text, 76, y + 12, { width: W - 16 });
  doc.fillColor(GRAY).moveDown(1.4);
}

function infoBox(text) {
  const y = doc.y + 4;
  doc
    .rect(65, y, W, 36)
    .fill(LIGHT);
  doc
    .rect(65, y, 4, 36)
    .fill(TEAL);
  doc
    .fillColor(NAVY)
    .fontSize(9.5)
    .font('Helvetica')
    .text(text, 76, y + 10, { width: W - 16, lineGap: 2 });
  doc.fillColor(GRAY).moveDown(1.4);
}

function divider() {
  doc.moveDown(0.5);
  doc.moveTo(65, doc.y).lineTo(65 + W, doc.y).strokeColor('#E8E8E4').stroke();
  doc.moveDown(0.5);
}

// ─── COVER PAGE ─────────────────────────────────────────────────────────────

doc.rect(0, 0, doc.page.width, doc.page.height).fill(NAVY);

// Gold accent bar top
doc.rect(0, 0, doc.page.width, 10).fill(GOLD);

// Teal circle decoration
doc.circle(doc.page.width - 60, 160, 140).fill(TEAL).opacity(0.12);
doc.opacity(1);
doc.circle(60, doc.page.height - 80, 100).fill(TEAL).opacity(0.08);
doc.opacity(1);

// Brand name
doc
  .fillColor('white')
  .fontSize(13)
  .font('Helvetica')
  .text('ColitisHelpUSA.com', 65, 40);

// Main title
doc
  .fillColor('white')
  .fontSize(38)
  .font('Helvetica-Bold')
  .text('UC Flare', 65, 110, { lineGap: 4 });

doc
  .fillColor(TEAL)
  .fontSize(38)
  .font('Helvetica-Bold')
  .text('Survival Guide', 65, 158);

// Subtitle
doc
  .fillColor('rgba(255,255,255,0.75)')
  .fontSize(14)
  .font('Helvetica')
  .text('What to do when ulcerative colitis symptoms spike', 65, 215, { lineGap: 3 });

// Divider line
doc.moveTo(65, 255).lineTo(380, 255).strokeColor(TEAL).lineWidth(1.5).stroke();

// What's inside
const items = [
  'Warning signs a flare is starting',
  'When to call your doctor immediately',
  'What to eat — and what to avoid',
  'How to stay hydrated',
  'What NOT to do during a flare',
  '25 questions to ask your GI doctor',
  'Symptom tracker (fill in daily)',
];

doc
  .fillColor(GOLD)
  .fontSize(11)
  .font('Helvetica-Bold')
  .text("What's inside:", 65, 272);

let iy = 292;
items.forEach((item) => {
  doc.fillColor('white').fontSize(10).font('Helvetica').text(`✓  ${item}`, 65, iy, { lineGap: 1 });
  iy += 20;
});

// Disclaimer bottom
doc
  .rect(0, doc.page.height - 58, doc.page.width, 58)
  .fill('#071A32');
doc
  .fillColor('rgba(255,255,255,0.5)')
  .fontSize(8)
  .font('Helvetica')
  .text(
    'This guide is for educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a licensed gastroenterologist for your specific situation.',
    65,
    doc.page.height - 42,
    { width: W, lineGap: 2 }
  );

// Gold bar bottom
doc.rect(0, doc.page.height - 6, doc.page.width, 6).fill(GOLD);

// ─── PAGE 2 — WHAT IS A FLARE + WARNING SIGNS ───────────────────────────────

doc.addPage();

// Header bar on every content page
doc.rect(0, 0, doc.page.width, 40).fill(NAVY);
doc
  .fillColor('white')
  .fontSize(9)
  .font('Helvetica')
  .text('UC Flare Survival Guide  |  ColitisHelpUSA.com  |  Educational purposes only — not medical advice', 65, 14);

doc.fillColor(GRAY).moveDown(0.5);

// Page title
doc
  .fillColor(NAVY)
  .fontSize(18)
  .font('Helvetica-Bold')
  .text('Understanding a UC Flare', 65, 58);
doc.moveDown(0.5);

body(
  'A flare — also called active disease or a relapse — occurs when UC symptoms return or worsen after a period of remission. During remission, inflammation in the colon is low or absent and most people function relatively normally. During a flare, that inflammation returns, bringing symptoms with it.'
);
body(
  'Flares can be mild, moderate, or severe. Some resolve within a few weeks with the right treatment. Others last months if left unaddressed. Recognizing one early and contacting your gastroenterologist promptly gives you the best chance of getting it under control quickly.'
);

sectionTitle('WARNING SIGNS A FLARE IS STARTING');

body('Contact your GI doctor when you notice any of the following returning or worsening:');

const earlyWarnings = [
  'More trips to the bathroom than your usual baseline',
  'Return of blood in stool after it had been absent',
  'More abdominal cramping or pain than normal',
  'Looser or more urgent stools',
  'Fatigue that worsens despite adequate rest',
  'Waking at night to use the bathroom',
  'Loss of appetite or nausea',
];
earlyWarnings.forEach(bullet);
doc.moveDown(0.5);

infoBox('Tip: Track your symptoms daily — stool frequency, blood (yes/no), pain level 1–10, and energy level. This information is exactly what your doctor needs to assess your flare severity.');

sectionTitle('WHEN TO SEEK URGENT OR EMERGENCY CARE');

warningBox('Seek emergency care immediately if you have heavy rectal bleeding, severe abdominal pain, high fever (above 101.3°F / 38.5°C), signs of dehydration, or inability to keep fluids down.');

body('Call your doctor same-day (do not wait for your next appointment) if you have:');

const urgentSigns = [
  'Significantly increased rectal bleeding',
  'Fever above 101.3°F / 38.5°C',
  'Severe abdominal pain or cramping',
  'Feeling faint, very weak, or dizzy',
  'Inability to eat or drink for more than 24 hours',
  'Rapid weight loss over a short period',
];
urgentSigns.forEach(bullet);
doc.moveDown(0.5);

sectionTitle('COMMON FLARE TRIGGERS TO KNOW ABOUT');

const triggers = [
  ['Missing or stopping medication', 'Missing doses of UC medication — even briefly — is one of the most common causes of a flare. Mesalamine and other maintenance medications must be taken consistently, not just when you have symptoms.'],
  ['Infections and illness', 'Gastrointestinal infections (including C. difficile) can trigger flares directly. If you develop a stomach bug during your flare, ask your doctor to test for infection before changing your UC medications.'],
  ['NSAIDs (ibuprofen, naproxen)', 'Ibuprofen (Advil, Motrin) and naproxen (Aleve) can irritate the gut lining and worsen UC. Use acetaminophen (Tylenol) instead for pain — and always check with your doctor first.'],
  ['Antibiotics', 'Antibiotics disrupt the gut microbiome and can trigger flares in some people. Always inform your gastroenterologist if you are prescribed antibiotics for any reason.'],
  ['Psychological stress', 'Stress does not cause UC but can worsen symptoms. Sleep, regular movement, and mental health support are all part of managing UC effectively.'],
  ['Certain foods', 'No food causes UC, but during a flare specific foods aggravate inflammation. See the diet section of this guide for specifics.'],
];

triggers.forEach(([title, desc]) => {
  subTitle(title);
  body(desc);
});

// ─── PAGE 3 — DIET ──────────────────────────────────────────────────────────

doc.addPage();
doc.rect(0, 0, doc.page.width, 40).fill(NAVY);
doc.fillColor('white').fontSize(9).font('Helvetica').text('UC Flare Survival Guide  |  ColitisHelpUSA.com  |  Educational purposes only — not medical advice', 65, 14);

doc.fillColor(NAVY).fontSize(18).font('Helvetica-Bold').text('What to Eat During a Flare', 65, 58);
doc.moveDown(0.4);

body('When UC symptoms spike, the inflamed colon is more sensitive and has less capacity to process difficult foods. Eating thoughtfully reduces gut irritation and helps maintain nutrition while your body heals. The goal is not perfection — it is minimizing stress on your digestive system while staying nourished.');

infoBox('Eat small, frequent meals rather than three large ones. Small portions put less strain on the inflamed gut and reduce cramping after eating.');

sectionTitle('FOODS THAT TEND TO BE BETTER TOLERATED');

subTitle('Cooked vegetables (peeled and soft)');
const goodVeg = ['Peeled, well-cooked carrots', 'Peeled mashed or boiled potatoes (no skin)', 'Cooked zucchini or squash (no seeds)', 'Butternut squash, steamed until soft', 'Cooked green beans (no skins)'];
goodVeg.forEach(bullet);
doc.moveDown(0.3);

subTitle('Refined grains and starches');
const goodGrains = ['White rice — plain, well cooked', 'Plain white bread or toast', 'Plain crackers (saltines)', 'Plain pasta or white-flour noodles', 'Plain oatmeal — cooked soft'];
goodGrains.forEach(bullet);
doc.moveDown(0.3);

subTitle('Lean proteins');
const goodProtein = ['Skinless chicken breast — baked or boiled', 'White fish (cod, tilapia) — baked or steamed', 'Eggs — scrambled, boiled, or poached (not fried)', 'Firm tofu (plain)', 'Smooth peanut butter in small amounts (if tolerated)'];
goodProtein.forEach(bullet);
doc.moveDown(0.3);

subTitle('Soft fruits (ripe and peeled)');
const goodFruit = ['Ripe banana — one of the most universally tolerated fruits', 'Canned peaches or pears in juice (no skin)', 'Unsweetened cooked applesauce', 'Ripe melon (no rind)'];
goodFruit.forEach(bullet);
doc.moveDown(0.3);

subTitle('Hydrating liquids');
const goodFluids = ['Water — sip consistently throughout the day', 'Oral rehydration solutions (Pedialyte, Liquid IV) — replace electrolytes lost through diarrhea', 'Clear chicken or vegetable broth', 'Bone broth', 'Herbal teas (chamomile, peppermint — not caffeinated)', 'Diluted fruit juice (not citrus)'];
goodFluids.forEach(bullet);
doc.moveDown(0.3);

sectionTitle('FOODS TO AVOID DURING A FLARE');

const avoidFoods = [
  ['Raw vegetables with skins', 'High insoluble fiber — hard to digest, increases stool frequency'],
  ['Whole grains, bran, seeds, nuts', 'High fiber increases stool bulk and urgency'],
  ['Spicy foods', 'Irritates the gut lining and worsens urgency and cramping'],
  ['Fried or fatty foods', 'Stimulates gut motility and makes diarrhea worse'],
  ['Caffeine (coffee, energy drinks)', 'Stimulates bowel movements, increases urgency'],
  ['Alcohol', 'Irritates the gut lining and can worsen inflammation'],
  ['Artificial sweeteners', 'Sugar alcohols (sorbitol, mannitol) cause diarrhea and gas'],
  ['Carbonated drinks', 'Cause bloating and gas in an already inflamed gut'],
  ['Large portions', 'Overwhelm digestive capacity — eat small amounts more frequently'],
  ['Dairy (if sensitive)', 'Can worsen loose stools in people with lactose sensitivity — test your tolerance'],
];

avoidFoods.forEach(([food, reason]) => {
  doc.fillColor(RED).fontSize(10).font('Helvetica-Bold').text(`✗  ${food}`, { indent: 8 });
  doc.fillColor(GRAY).fontSize(9.5).font('Helvetica').text(`   ${reason}`, { indent: 12, lineGap: 1 });
  doc.moveDown(0.2);
});

// ─── PAGE 4 — WHAT NOT TO DO + MANAGEMENT ───────────────────────────────────

doc.addPage();
doc.rect(0, 0, doc.page.width, 40).fill(NAVY);
doc.fillColor('white').fontSize(9).font('Helvetica').text('UC Flare Survival Guide  |  ColitisHelpUSA.com  |  Educational purposes only — not medical advice', 65, 14);

doc.fillColor(NAVY).fontSize(18).font('Helvetica-Bold').text('Managing a Flare at Home', 65, 58);
doc.moveDown(0.5);

sectionTitle('WHAT TO DO WHILE YOU WAIT FOR YOUR APPOINTMENT');

const doList = [
  'Stay hydrated — diarrhea causes fluid and electrolyte loss. Oral rehydration solutions are better than water alone during severe diarrhea.',
  'Eat small, low-irritation meals as described in the diet section. Do not skip meals entirely even if appetite is low.',
  'Rest when possible — fatigue during a flare is real and has a physiological cause (inflammation, blood loss, disrupted sleep).',
  'Track your symptoms daily — stool frequency, blood present (yes/no), pain level 1–10, energy level. Your doctor will ask for this.',
  'Continue your maintenance medications unless your doctor tells you otherwise. Stopping them can make the flare worse.',
  'Use acetaminophen (Tylenol) if you need pain relief — avoid ibuprofen and naproxen, which can worsen UC.',
  'Contact your GI office and explain what is happening. Do not simply wait for your next scheduled appointment.',
];
doList.forEach(bullet);
doc.moveDown(0.5);

sectionTitle('WHAT NOT TO DO DURING A FLARE');

const dontList = [
  ['Do NOT stop your UC medications', 'Stopping mesalamine, biologics, or immunomodulators without guidance can cause the flare to worsen significantly.'],
  ['Do NOT take ibuprofen or naproxen', 'NSAIDs irritate the gut lining and can trigger or worsen a flare. Use acetaminophen instead.'],
  ['Do NOT wait weeks to contact your doctor', 'Flares are easier to control when caught early. Call your GI office as soon as you notice symptoms worsening.'],
  ['Do NOT make major diet changes without guidance', 'Eliminating entire food groups can cause nutritional deficiencies on top of an already difficult flare.'],
  ['Do NOT self-prescribe steroids', 'Prednisone and other steroids require medical supervision. Taking them incorrectly can cause serious side effects.'],
  ['Do NOT ignore warning signs', 'Heavy bleeding, high fever, severe pain, or inability to keep fluids down are emergencies. Seek care immediately.'],
];

dontList.forEach(([title, desc]) => {
  doc.fillColor(RED).fontSize(10).font('Helvetica-Bold').text(title);
  doc.fillColor(GRAY).fontSize(9.5).font('Helvetica').text(desc, { indent: 12, lineGap: 1 });
  doc.moveDown(0.35);
});

sectionTitle('HOW FLARES ARE TREATED BY YOUR DOCTOR');

body('Your gastroenterologist will assess flare severity and recommend treatment based on your individual history. Common approaches:');

const treatments = [
  ['Mild to moderate flares', 'Increased dose of current medication, adding rectal therapy (suppositories or enemas), or a short course of oral corticosteroids (prednisone or budesonide).'],
  ['Moderate to severe flares', 'Oral or intravenous corticosteroids, stepping up to a biologic medication (infliximab, vedolizumab, ustekinumab, or others) or a JAK inhibitor (tofacitinib, upadacitinib).'],
  ['Refractory flares', 'If multiple medications have failed, your doctor may discuss surgical options. For UC, surgery (removal of the colon) can be curative — unlike Crohn\'s disease.'],
];

treatments.forEach(([severity, desc]) => {
  subTitle(severity);
  body(desc);
});

infoBox('If you are repeatedly needing steroids to control flares, this is called steroid-dependence. It is a signal that a more effective long-term maintenance therapy is needed. Discuss this pattern with your GI doctor.');

// ─── PAGE 5 — 25 QUESTIONS ──────────────────────────────────────────────────

doc.addPage();
doc.rect(0, 0, doc.page.width, 40).fill(NAVY);
doc.fillColor('white').fontSize(9).font('Helvetica').text('UC Flare Survival Guide  |  ColitisHelpUSA.com  |  Educational purposes only — not medical advice', 65, 14);

doc.fillColor(NAVY).fontSize(18).font('Helvetica-Bold').text('25 Questions to Ask Your GI Doctor', 65, 58);
doc.moveDown(0.3);
body('Bring this list to your next appointment. Being specific about your symptoms helps your doctor make the right decisions faster.');

const questionGroups = [
  {
    title: 'About your current flare',
    questions: [
      'Do my current symptoms indicate I am in a flare — and how severe is it?',
      'Do we need tests to confirm: stool test, blood test, or a scope?',
      'How do my symptoms compare to my previous flares?',
      'Is there any chance this could be a C. difficile infection rather than a UC flare?',
      'Should I be checked for anemia given the blood in my stool?',
    ],
  },
  {
    title: 'About treatment',
    questions: [
      'Do we need to adjust my current medication — dose, formulation, or route?',
      'Is a short course of corticosteroids (prednisone or budesonide) appropriate?',
      'If I need steroids again, does that mean my current treatment is not working?',
      'Am I a candidate for a biologic medication or a JAK inhibitor?',
      'What does each treatment option involve — how is it given, how often, what monitoring is required?',
      'Are there patient assistance programs for biologics if cost is a concern?',
    ],
  },
  {
    title: 'About symptoms and monitoring',
    questions: [
      'What specific symptoms should prompt me to call your office urgently?',
      'What symptoms mean I should go to the emergency room?',
      'Should I keep a symptom diary — and what should I track?',
      'Should I have a colonoscopy to assess my current disease activity?',
      'Is my fatigue related to anemia, and should we check my iron levels?',
    ],
  },
  {
    title: 'About diet and lifestyle',
    questions: [
      'Should I be referred to a registered dietitian who specializes in IBD?',
      'Are there specific foods I should avoid given my current medications?',
      'Are there supplements I should be taking — iron, vitamin D, B12, folate?',
      'Is it safe for me to exercise during this flare?',
    ],
  },
  {
    title: 'About long-term management',
    questions: [
      'If this is my second (or third) flare this year, what does that mean for my long-term treatment plan?',
      'Is my disease progressing — and how can we tell?',
      'What are my options if I continue to flare on my current medication?',
      'Should I consider clinical trials for new UC treatments?',
    ],
  },
];

questionGroups.forEach(({ title, questions }) => {
  subTitle(title);
  questions.forEach((q, i) => {
    doc
      .fillColor(GRAY)
      .fontSize(9.5)
      .font('Helvetica')
      .text(`${i + 1}.  ${q}`, { indent: 10, lineGap: 2 });
    doc.moveDown(0.15);
  });
  doc.moveDown(0.2);
});

// ─── PAGE 6 — SYMPTOM TRACKER ───────────────────────────────────────────────

doc.addPage();
doc.rect(0, 0, doc.page.width, 40).fill(NAVY);
doc.fillColor('white').fontSize(9).font('Helvetica').text('UC Flare Survival Guide  |  ColitisHelpUSA.com  |  Educational purposes only — not medical advice', 65, 14);

doc.fillColor(NAVY).fontSize(18).font('Helvetica-Bold').text('Daily Symptom Tracker', 65, 58);
doc.moveDown(0.3);
body('Fill this in every day during your flare. Bring it to your appointment — your doctor will use this to assess severity and guide treatment decisions.');

doc.moveDown(0.3);

// Table header
const cols = [90, 80, 80, 80, 80, 80];
const headers = ['Date', 'Bowel\nmovements', 'Blood\n(Y/N)', 'Pain\n(1–10)', 'Energy\n(1–10)', 'Notes'];
let tx = 65;
let ty = doc.y;

// Draw header row
doc.rect(65, ty, W, 28).fill(NAVY);
headers.forEach((h, i) => {
  doc
    .fillColor('white')
    .fontSize(8.5)
    .font('Helvetica-Bold')
    .text(h, tx + 4, ty + 4, { width: cols[i] - 8, align: 'center' });
  tx += cols[i];
});

// Draw data rows
for (let row = 0; row < 14; row++) {
  ty += 28;
  tx = 65;
  const bg = row % 2 === 0 ? '#F7F7F5' : 'white';
  doc.rect(65, ty, W, 28).fill(bg);
  cols.forEach((w) => {
    doc.rect(tx, ty, w, 28).stroke('#E8E8E4');
    tx += w;
  });
}

doc.moveDown(14 * 28 / 12 + 2);

divider();

infoBox('Share this tracker with your GI doctor at your next visit. Nocturnal symptoms (waking at night) and increasing blood are two of the most important signals your doctor needs to know about.');

doc.moveDown(0.5);

// ─── BACK COVER ─────────────────────────────────────────────────────────────

doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(NAVY);
doc.rect(0, 0, doc.page.width, 8).fill(GOLD);
doc.rect(0, doc.page.height - 8, doc.page.width, 8).fill(GOLD);

doc
  .fillColor('white')
  .fontSize(22)
  .font('Helvetica-Bold')
  .text('More free resources at', 65, 120, { align: 'center', width: W });

doc
  .fillColor(TEAL)
  .fontSize(28)
  .font('Helvetica-Bold')
  .text('colitishelpusa.com', 65, 156, { align: 'center', width: W });

const resources = [
  ['Ulcerative Colitis Symptoms Guide', '/blog/ulcerative-colitis-symptoms'],
  ['UC Treatment Options — Plain English', '/blog/ulcerative-colitis-treatment-options'],
  ['Biologics for UC — Full Guide', '/blog/biologics-for-ulcerative-colitis'],
  ['JAK Inhibitors for UC', '/blog/jak-inhibitors-ulcerative-colitis'],
  ['Crohn\'s Disease vs Ulcerative Colitis', '/blog/crohns-vs-ulcerative-colitis'],
  ['UC Diet Guide', '/blog/ulcerative-colitis-diet'],
  ['UC Care Options Check (Free, 8 questions)', '/uc-care-options-check'],
];

doc.moveDown(2);
resources.forEach(([title, url]) => {
  doc
    .fillColor('white')
    .fontSize(10.5)
    .font('Helvetica-Bold')
    .text(title, 65, doc.y, { align: 'center', width: W });
  doc
    .fillColor(TEAL)
    .fontSize(9)
    .font('Helvetica')
    .text(`colitishelpusa.com${url}`, 65, doc.y, { align: 'center', width: W });
  doc.moveDown(0.7);
});

doc
  .fillColor('rgba(255,255,255,0.35)')
  .fontSize(8)
  .font('Helvetica')
  .text(
    'This guide is for educational purposes only. It is not medical advice, diagnosis, or treatment.\nAlways consult a licensed gastroenterologist for decisions about your care.',
    65,
    doc.page.height - 80,
    { align: 'center', width: W, lineGap: 2 }
  );

doc.end();

console.log('✓ PDF generated at public/uc-flare-guide.pdf');
