interface CTAButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

const styles = {
  primary: { backgroundColor: '#C8902A', color: 'white', border: 'none' },
  secondary: { backgroundColor: '#0E6B8E', color: 'white', border: 'none' },
  outline: { backgroundColor: 'transparent', color: '#0B2545', border: '2px solid #0B2545' },
  ghost: { backgroundColor: 'transparent', color: 'white', border: '2px solid white' },
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

export default function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth,
  children,
  className = '',
  pulse,
}: CTAButtonProps) {
  return (
    <a
      href={href}
      style={styles[variant]}
      className={`inline-block rounded-lg font-semibold transition-opacity hover:opacity-85 ${sizes[size]} ${fullWidth ? 'w-full text-center' : ''} ${pulse ? 'animate-pulse-gold' : ''} ${className}`}
    >
      {children}
    </a>
  );
}
