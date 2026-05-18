import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'public', 'uc-symptom-tracker.pdf');

const NAVY  = '#0B2545';
const TEAL  = '#0E6B8E';
const GOLD  = '#C8902A';
const GRAY  = '#5C5C56';
const LIGHT = '#E4F5F7';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  info: {
    Title: 'UC Daily Symptom Tracker — ColitisHelpUSA.com',
    Author: 'ColitisHelpUSA.com',
    Subject: 'Ulcerative Colitis Daily Symptom Log — Educational Tool',
    Keywords: 'ulcerative colitis, UC symptom tracker, IBD log, symptom diary',
  },
});

doc.pipe(fs.createWriteStream(outputPath));

const PW = doc.page.width;
const PH = doc.page.height;
const ML = 50;
const MR = 50;
const W  = PW - ML - MR; // 512pt usable width

// ─── PAGE 1 — TRACKER ──────────────────────────────────────────────────────

// Header bar
doc.rect(0, 0, PW, 44).fill(NAVY);
doc.rect(0, 0, PW, 5).fill(GOLD);

doc
  .fillColor('white')
  .fontSize(15)
  .font('Helvetica-Bold')
  .text('UC Daily Symptom Tracker', ML, 14);
doc
  .fillColor(GOLD)
  .fontSize(9)
  .font('Helvetica')
  .text('ColitisHelpUSA.com', ML + 300, 18);

// Name / date range line
const topY = 56;
doc
  .fillColor(NAVY)
  .fontSize(9)
  .font('Helvetica-Bold')
  .text('Patient name:', ML, topY);
doc.moveTo(ML + 74, topY + 10).lineTo(ML + 220, topY + 10).strokeColor('#AAAAAA').lineWidth(0.8).stroke();

doc
  .fillColor(NAVY)
  .fontSize(9)
  .font('Helvetica-Bold')
  .text('Week of:', ML + 240, topY);
doc.moveTo(ML + 282, topY + 10).lineTo(ML + 380, topY + 10).strokeColor('#AAAAAA').lineWidth(0.8).stroke();

doc
  .fillColor(GRAY)
  .fontSize(8)
  .font('Helvetica')
  .text('Print and fill in daily. Bring to your next GI appointment.', ML + 390, topY + 2);

// ─── TABLE ──────────────────────────────────────────────────────────────────

// Column definitions: [label, width]
const cols = [
  ['Date',               58],
  ['Pain\n(0–10)',       44],
  ['Urgency\n(0–10)',    46],
  ['Stool Freq\n(#/day)',50],
  ['Blood in\nStool?',   46],
  ['Foods Eaten Today', 118],
  ['Stress\nL/M/H',      44],
  ['Notes',              66],
];

const ROW_H    = 27;
const HDR_H    = 32;
const TABLE_Y  = topY + 22;

// Header row
let cx = ML;
doc.rect(ML, TABLE_Y, W, HDR_H).fill(NAVY);
cols.forEach(([label, cw]) => {
  doc
    .fillColor('white')
    .fontSize(7.5)
    .font('Helvetica-Bold')
    .text(label, cx + 3, TABLE_Y + 4, { width: cw - 6, align: 'center', lineGap: 1 });
  cx += cw;
});

// Data rows (14)
for (let row = 0; row < 14; row++) {
  const ry  = TABLE_Y + HDR_H + row * ROW_H;
  const bg  = row % 2 === 0 ? '#F5F5F3' : '#FFFFFF';
  doc.rect(ML, ry, W, ROW_H).fill(bg);

  // Column borders
  let bx = ML;
  cols.forEach(([, cw]) => {
    doc.rect(bx, ry, cw, ROW_H).strokeColor('#D8D8D4').lineWidth(0.5).stroke();
    bx += cw;
  });

  // Row number (light)
  doc
    .fillColor('#BBBBBB')
    .fontSize(7)
    .font('Helvetica')
    .text(String(row + 1), ML + 2, ry + 10);
}

// Outer table border
doc
  .rect(ML, TABLE_Y, W, HDR_H + 14 * ROW_H)
  .strokeColor(NAVY)
  .lineWidth(1)
  .stroke();

// ─── "BRING TO APPOINTMENT" NOTE ────────────────────────────────────────────

const noteY = TABLE_Y + HDR_H + 14 * ROW_H + 12;
doc
  .rect(ML, noteY, W, 36)
  .fill(LIGHT);
doc
  .rect(ML, noteY, 4, 36)
  .fill(TEAL);
doc
  .fillColor(NAVY)
  .fontSize(9.5)
  .font('Helvetica-Bold')
  .text('Bring this log to your GI appointment', ML + 12, noteY + 6);
doc
  .fillColor(GRAY)
  .fontSize(8.5)
  .font('Helvetica')
  .text(
    'Your doctor will use stool frequency, blood presence, pain levels, and nighttime symptoms to assess your disease activity and adjust your treatment plan.',
    ML + 12, noteY + 18,
    { width: W - 20, lineGap: 1 }
  );

// ─── FOOTER ──────────────────────────────────────────────────────────────────

doc
  .rect(0, PH - 28, PW, 28)
  .fill('#071A32');
doc
  .fillColor('rgba(255,255,255,0.55)')
  .fontSize(7.5)
  .font('Helvetica')
  .text(
    'ColitisHelpUSA.com  |  This tracker is for informational purposes only. Always consult your doctor.',
    ML, PH - 18,
    { width: W, align: 'center' }
  );

// ─── PAGE 2 — TIPS + SECOND TRACKER ─────────────────────────────────────────

doc.addPage();

// Header bar
doc.rect(0, 0, PW, 44).fill(NAVY);
doc.rect(0, 0, PW, 5).fill(GOLD);
doc
  .fillColor('white')
  .fontSize(15)
  .font('Helvetica-Bold')
  .text('UC Daily Symptom Tracker', ML, 14);
doc
  .fillColor(GOLD)
  .fontSize(9)
  .font('Helvetica')
  .text('ColitisHelpUSA.com', ML + 300, 18);

// Week 2 header
const top2Y = 56;
doc
  .fillColor(NAVY)
  .fontSize(9)
  .font('Helvetica-Bold')
  .text('Patient name:', ML, top2Y);
doc.moveTo(ML + 74, top2Y + 10).lineTo(ML + 220, top2Y + 10).strokeColor('#AAAAAA').lineWidth(0.8).stroke();
doc
  .fillColor(NAVY)
  .fontSize(9)
  .font('Helvetica-Bold')
  .text('Week of:', ML + 240, top2Y);
doc.moveTo(ML + 282, top2Y + 10).lineTo(ML + 380, top2Y + 10).strokeColor('#AAAAAA').lineWidth(0.8).stroke();
doc
  .fillColor(GRAY)
  .fontSize(8)
  .font('Helvetica')
  .text('Week 2 of 2', ML + 390, top2Y + 2);

// Second tracker table (7 rows for days 8–14)
const TABLE2_Y = top2Y + 22;
cx = ML;
doc.rect(ML, TABLE2_Y, W, HDR_H).fill(NAVY);
cols.forEach(([label, cw]) => {
  doc
    .fillColor('white')
    .fontSize(7.5)
    .font('Helvetica-Bold')
    .text(label, cx + 3, TABLE2_Y + 4, { width: cw - 6, align: 'center', lineGap: 1 });
  cx += cw;
});

for (let row = 0; row < 7; row++) {
  const ry  = TABLE2_Y + HDR_H + row * ROW_H;
  const bg  = row % 2 === 0 ? '#F5F5F3' : '#FFFFFF';
  doc.rect(ML, ry, W, ROW_H).fill(bg);
  let bx = ML;
  cols.forEach(([, cw]) => {
    doc.rect(bx, ry, cw, ROW_H).strokeColor('#D8D8D4').lineWidth(0.5).stroke();
    bx += cw;
  });
  doc.fillColor('#BBBBBB').fontSize(7).font('Helvetica').text(String(row + 8), ML + 2, ry + 10);
}
doc.rect(ML, TABLE2_Y, W, HDR_H + 7 * ROW_H).strokeColor(NAVY).lineWidth(1).stroke();

// Scoring guide
const guideY = TABLE2_Y + HDR_H + 7 * ROW_H + 14;
doc
  .fillColor(NAVY)
  .fontSize(10)
  .font('Helvetica-Bold')
  .text('How to score your symptoms', ML, guideY);

doc.moveDown(0.3);

const tips = [
  ['Pain (0–10)', '0 = no pain at all  ·  5 = noticeable but manageable  ·  10 = worst pain imaginable'],
  ['Urgency (0–10)', '0 = no urgency  ·  5 = can wait a few minutes  ·  10 = cannot delay at all'],
  ['Stool Frequency', 'Count all bathroom trips including incomplete ones. Write the total number for the day.'],
  ['Blood in Stool?', 'Write Yes or No. If yes, note whether it is a small streak or heavy bleeding in Notes.'],
  ['Stress (L/M/H)', 'L = low (calm day)  ·  M = medium (some pressure)  ·  H = high (very stressful day)'],
  ['Foods Eaten Today', 'Write the main foods you ate. You do not need to list every item — focus on anything unusual.'],
];

tips.forEach(([label, desc]) => {
  const ly = doc.y;
  doc
    .fillColor(TEAL)
    .fontSize(8.5)
    .font('Helvetica-Bold')
    .text(label + ':', ML, ly, { continued: true, width: 110 });
  doc
    .fillColor(GRAY)
    .fontSize(8.5)
    .font('Helvetica')
    .text('  ' + desc, { lineGap: 1 });
  doc.moveDown(0.25);
});

// "What to tell your doctor" box
const warnY = doc.y + 8;
doc.rect(ML, warnY, W, 52).fill('#FFF8EC');
doc.rect(ML, warnY, 4, 52).fill(GOLD);
doc
  .fillColor(NAVY)
  .fontSize(9.5)
  .font('Helvetica-Bold')
  .text('What to highlight for your GI doctor', ML + 12, warnY + 6);
doc
  .fillColor(GRAY)
  .fontSize(8.5)
  .font('Helvetica')
  .text(
    'Nighttime symptoms (waking to use the bathroom)  ·  Days with blood  ·  Pain scores above 6  ·  ' +
    'Days where urgency was 8 or higher  ·  Any foods that consistently made symptoms worse',
    ML + 12, warnY + 20,
    { width: W - 20, lineGap: 2 }
  );

// Footer
doc
  .rect(0, PH - 28, PW, 28)
  .fill('#071A32');
doc
  .fillColor('rgba(255,255,255,0.55)')
  .fontSize(7.5)
  .font('Helvetica')
  .text(
    'ColitisHelpUSA.com  |  This tracker is for informational purposes only. Always consult your doctor.',
    ML, PH - 18,
    { width: W, align: 'center' }
  );

doc.end();
console.log('✓ PDF generated at public/uc-symptom-tracker.pdf');
