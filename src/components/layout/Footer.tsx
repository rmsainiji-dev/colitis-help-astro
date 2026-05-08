export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#071A32', color: 'white' }}>
      <div className="max-w-[1220px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="font-bold text-lg mb-2">ColitisHelpUSA.com</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Patient education and care-navigation information</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Not a medical provider</p>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>Learn</p>
            <div className="flex flex-col gap-2">
              <FooterLink href="/ulcerative-colitis-symptoms">UC Symptoms</FooterLink>
              <FooterLink href="/ulcerative-colitis-flare-up">UC Flare-Up Guide</FooterLink>
              <FooterLink href="/ulcerative-colitis-treatment-options">UC Treatment Options</FooterLink>
              <FooterLink href="/biologics-for-ulcerative-colitis">Biologics for UC</FooterLink>
              <FooterLink href="/jak-inhibitors-ulcerative-colitis">JAK Inhibitors for UC</FooterLink>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>Resources</p>
            <div className="flex flex-col gap-2">
              <FooterLink href="/ulcerative-colitis-diet">UC Diet Guide</FooterLink>
              <FooterLink href="/ulcerative-colitis-insurance-coverage">Insurance and Costs</FooterLink>
              <FooterLink href="/ulcerative-colitis-clinical-trials-usa">Clinical Trials</FooterLink>
              <FooterLink href="/crohns-vs-ulcerative-colitis">Crohn&apos;s vs UC</FooterLink>
              <FooterLink href="/ibd-vs-ibs">IBD vs IBS</FooterLink>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>Site</p>
            <div className="flex flex-col gap-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/medical-disclaimer">Medical Disclaimer</FooterLink>
              <FooterLink href="/partner-disclosure">Partner Disclosure</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Use</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Colitis Help USA is an educational website and care-navigation resource. We do not provide medical advice, diagnosis, or treatment. Information on this website should not replace guidance from a licensed healthcare professional. If you are experiencing severe symptoms such as heavy bleeding, high fever, dehydration, or severe abdominal pain, seek urgent medical care or call emergency services.
          </p>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2025 ColitisHelpUSA.com — Educational use only
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.65)' }}>
      {children}
    </a>
  );
}
