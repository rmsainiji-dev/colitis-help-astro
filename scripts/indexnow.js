const KEY = 'f3a8c2e1d94b7056a3f1e8c20d947b35';
const HOST = 'colitishelpusa.com';

const urls = [
  'https://colitishelpusa.com/',
  'https://colitishelpusa.com/ulcerative-colitis',
  'https://colitishelpusa.com/ulcerative-colitis-symptoms',
  'https://colitishelpusa.com/ulcerative-colitis-flare-up',
  'https://colitishelpusa.com/ulcerative-colitis-diet',
  'https://colitishelpusa.com/what-to-eat-during-uc-flare',
  'https://colitishelpusa.com/biologics-for-ulcerative-colitis',
  'https://colitishelpusa.com/jak-inhibitors-ulcerative-colitis',
  'https://colitishelpusa.com/mesalamine-not-working-ulcerative-colitis',
  'https://colitishelpusa.com/prednisone-for-ulcerative-colitis',
  'https://colitishelpusa.com/ulcerative-colitis-treatment-options',
  'https://colitishelpusa.com/ulcerative-colitis-insurance-coverage',
  'https://colitishelpusa.com/ulcerative-colitis-clinical-trials-usa',
  'https://colitishelpusa.com/ulcerative-colitis-second-opinion-checklist',
  'https://colitishelpusa.com/uc-symptom-tracker',
  'https://colitishelpusa.com/uc-care-options-check',
  'https://colitishelpusa.com/free-uc-flare-guide',
  'https://colitishelpusa.com/gi-doctor-questions',
  'https://colitishelpusa.com/uc-treatment-comparison',
  'https://colitishelpusa.com/blood-in-stool-ulcerative-colitis',
  'https://colitishelpusa.com/crohns-vs-ulcerative-colitis',
  'https://colitishelpusa.com/ibd-guide',
  'https://colitishelpusa.com/ibd-vs-ibs',
  'https://colitishelpusa.com/blog/ulcerative-colitis-symptoms',
  'https://colitishelpusa.com/blog/ulcerative-colitis-flare-up',
  'https://colitishelpusa.com/blog/blood-in-stool-ulcerative-colitis',
  'https://colitishelpusa.com/blog/ulcerative-colitis-remission',
  'https://colitishelpusa.com/blog/ulcerative-colitis-treatment-options',
  'https://colitishelpusa.com/blog/biologics-for-ulcerative-colitis',
  'https://colitishelpusa.com/blog/jak-inhibitors-ulcerative-colitis',
  'https://colitishelpusa.com/blog/mesalamine-not-working-ulcerative-colitis',
  'https://colitishelpusa.com/blog/ulcerative-colitis-diet',
  'https://colitishelpusa.com/blog/what-to-eat-during-uc-flare',
  'https://colitishelpusa.com/blog/crohns-vs-ulcerative-colitis',
  'https://colitishelpusa.com/blog/prednisone-for-ulcerative-colitis',
  'https://colitishelpusa.com/blog/uc-surgery-colectomy',
  'https://colitishelpusa.com/blog/ulcerative-colitis-pregnancy',
  'https://colitishelpusa.com/blog/ulcerative-colitis-fatigue',
  'https://colitishelpusa.com/blog/ulcerative-colitis-mental-health',
  'https://colitishelpusa.com/blog/vedolizumab-entyvio-ulcerative-colitis',
  'https://colitishelpusa.com/blog/upadacitinib-rinvoq-ulcerative-colitis',
];

async function submitToIndexNow() {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls,
      }),
    });

    if (response.ok) {
      console.log(`IndexNow submitted successfully — ${urls.length} URLs`);
      console.log(`Status: ${response.status}`);
    } else {
      console.error(`IndexNow failed — Status: ${response.status}`);
      const text = await response.text();
      console.error('Response:', text);
    }
  } catch (error) {
    console.error('IndexNow error:', error.message);
  }
}

submitToIndexNow();
