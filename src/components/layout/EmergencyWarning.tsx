export default function EmergencyWarning() {
  return (
    <div
      role="alert"
      style={{ backgroundColor: '#FDECEA', borderLeft: '4px solid #C0392B' }}
      className="rounded-lg p-4 my-6"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="font-bold text-sm" style={{ color: '#C0392B' }}>Emergency Warning</p>
          <p className="text-sm mt-1" style={{ color: '#2A2A26' }}>
            If you have severe abdominal pain, heavy bleeding, high fever, or signs of dehydration — seek emergency care or call 911 immediately. Do not use this website as an emergency resource.
          </p>
        </div>
      </div>
    </div>
  );
}
