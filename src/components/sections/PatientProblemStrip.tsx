export default function PatientProblemStrip() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-2xl font-bold mb-6" style={{ color: '#0B2545' }}>
          You&apos;re not alone — UC affects over 1 million people in the US
        </p>
        <ul className="text-left space-y-3 mb-6 max-w-lg mx-auto">
          {[
            "Still dealing with blood in stool despite medication?",
            "Worried your current treatment isn't working?",
            "Not sure what questions to ask your GI doctor?",
            "Trying to understand what biologics or JAK inhibitors mean for you?",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-base" style={{ color: '#5C5C56' }}>
              <span className="text-lg mt-0.5" style={{ color: '#1B7A4E' }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed" style={{ color: '#5C5C56' }}>
          Colitis Help USA is an information and care-navigation resource — not a medical provider. We help you understand your options and find the right questions to ask your healthcare team.
        </p>
      </div>
    </section>
  );
}
