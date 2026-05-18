'use client';
import type { UseFormRegister } from 'react-hook-form';

interface ConsentCheckboxProps {
  register: UseFormRegister<any>;
  name: string;
  error?: string;
}

const CONSENT_TEXT =
  'I agree that Colitis Help USA may contact me by email to share free educational resources about ulcerative colitis care options. My information will not be sold. Consent is not required to use this website.';

export default function ConsentCheckbox({ register, name, error }: ConsentCheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={false}
          {...register(name, { required: 'You must agree to continue' })}
          className="mt-1 w-4 h-4 shrink-0 cursor-pointer"
          style={{ accentColor: '#C8902A' }}
        />
        <span className="text-sm leading-relaxed" style={{ color: '#2A2A26' }}>
          {CONSENT_TEXT}
        </span>
      </label>
      {error && <p className="text-xs" style={{ color: '#C0392B' }}>{error}</p>}
    </div>
  );
}
