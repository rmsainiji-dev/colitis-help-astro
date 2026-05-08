type AlertVariant = 'info' | 'warning' | 'danger' | 'success';

const alertStyles: Record<AlertVariant, { bg: string; border: string; color: string; icon: string }> = {
  info: { bg: '#E4F5F7', border: '#0E6B8E', color: '#0B2545', icon: 'ℹ️' },
  warning: { bg: '#F5E8C7', border: '#C8902A', color: '#2A2A26', icon: '⚠️' },
  danger: { bg: '#FDECEA', border: '#C0392B', color: '#2A2A26', icon: '🚨' },
  success: { bg: '#E8F5F0', border: '#1B7A4E', color: '#0B2545', icon: '✅' },
};

interface AlertBoxProps {
  variant?: AlertVariant;
  children: React.ReactNode;
}

export default function AlertBox({ variant = 'info', children }: AlertBoxProps) {
  const s = alertStyles[variant];
  return (
    <div
      className="rounded-lg p-4 my-4"
      style={{ backgroundColor: s.bg, borderLeft: `4px solid ${s.border}` }}
    >
      <div className="flex gap-2 text-sm" style={{ color: s.color }}>
        <span className="shrink-0">{s.icon}</span>
        <div>{children}</div>
      </div>
    </div>
  );
}
