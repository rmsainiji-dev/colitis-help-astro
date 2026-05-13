'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ConsentCheckbox from './ConsentCheckbox';
import { submitLead } from '@/lib/sheetsApi';

const schema = z.object({
  email: z.string().email('Valid email required'),
  name: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, 'You must agree to continue'),
  _hp: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface LeadMagnetFormProps {
  source: string;
  buttonText?: string;
  showName?: boolean;
  extraFields?: React.ReactNode;
  thankYouMessage?: string;
  downloadUrl?: string;
  downloadLabel?: string;
}

export default function LeadMagnetForm({
  source,
  buttonText = 'Send Me the Free Guide',
  showName = true,
  extraFields,
  thankYouMessage,
  downloadUrl,
  downloadLabel = 'Download Your Free Guide',
}: LeadMagnetFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSubmitError(false);
    const ok = await submitLead({ email: data.email, name: data.name, source, consentGiven: data.consent, _hp: data._hp });
    setLoading(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setSubmitError(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1B7A4E' }}>
        <div className="p-5" style={{ backgroundColor: '#E8F5F0' }}>
          <p className="font-semibold" style={{ color: '#1B7A4E' }}>
            ✓ {thankYouMessage || 'Your guide is on its way to your inbox!'}
          </p>
        </div>
        {downloadUrl && (
          <div className="p-5" style={{ backgroundColor: 'white', borderTop: '1px solid #D4EDDA' }}>
            <p className="text-sm mb-3" style={{ color: '#0B2545' }}>
              You can also download it directly right now:
            </p>
            <a
              href={downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-6 py-3 rounded-lg font-semibold text-sm text-white"
              style={{ backgroundColor: '#C8902A' }}
            >
              ↓ {downloadLabel}
            </a>
            <p className="text-xs mt-3" style={{ color: '#9C9C96' }}>
              A copy is also being sent to your inbox. This guide is for educational purposes only and is not a substitute for advice from a licensed healthcare professional.
            </p>
          </div>
        )}
        {!downloadUrl && (
          <div className="px-5 pb-5" style={{ backgroundColor: '#E8F5F0' }}>
            <p className="text-sm" style={{ color: '#5C5C56' }}>
              This resource is for educational purposes only and is not a substitute for advice from a licensed healthcare professional.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {/* Honeypot — hidden from real users, bots fill it automatically */}
      <input
        {...register('_hp')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />
      {showName && (
        <input
          {...register('name')}
          type="text"
          placeholder="First name (optional)"
          aria-label="First name (optional)"
          className="w-full px-4 py-3 rounded-lg text-sm border"
          style={{ borderColor: '#E8E8E4', color: '#2A2A26', backgroundColor: 'white' }}
        />
      )}
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          className="w-full px-4 py-3 rounded-lg text-sm border"
          style={{ borderColor: errors.email ? '#C0392B' : '#E8E8E4', color: '#2A2A26', backgroundColor: 'white' }}
        />
        {errors.email && (
          <p className="text-xs mt-1" style={{ color: '#C0392B' }}>
            {errors.email.message}
          </p>
        )}
      </div>
      {extraFields}
      <ConsentCheckbox register={register} name="consent" error={errors.consent?.message} />
      <p className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>
        By submitting, you agree that Colitis Help USA may contact you and may share your information with selected care-navigation or healthcare partners. Consent not required to use this site.
      </p>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-lg font-semibold text-sm text-white disabled:opacity-60"
        style={{ backgroundColor: '#C8902A' }}
      >
        {loading ? 'Sending...' : buttonText}
      </button>
      {submitError && (
        <p className="text-xs text-center" style={{ color: '#C0392B' }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
