interface QuickAnswerBoxProps {
  children: React.ReactNode;
}

export default function QuickAnswerBox({ children }: QuickAnswerBoxProps) {
  return (
    <div
      className="rounded-xl p-5 my-6"
      style={{ backgroundColor: '#E4F5F7', borderLeft: '4px solid #0E6B8E' }}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg mt-0.5">💡</span>
        <div className="text-sm leading-relaxed" style={{ color: '#0B2545' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
