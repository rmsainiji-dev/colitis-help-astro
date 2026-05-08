export default function DisclaimerBanner() {
  return (
    <div style={{ backgroundColor: '#E4F5F7', borderBottom: '1px solid #0FA3C8' }} className="py-2 px-4">
      <div className="max-w-[1220px] mx-auto flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0E6B8E" strokeWidth="2" className="shrink-0">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="text-[13px]" style={{ color: '#0E6B8E' }}>
          This website is for education only. It does not provide medical advice, diagnosis, or treatment. Always consult a licensed healthcare professional.
        </p>
      </div>
    </div>
  );
}
