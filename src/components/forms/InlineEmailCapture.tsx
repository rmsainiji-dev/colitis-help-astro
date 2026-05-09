'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitLead } from '@/lib/sheetsApi';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface InlineEmailCaptureProps {
  source: string;
  buttonText?: string;
}

export default function InlineEmailCapture({
  source,
  buttonText = 'Send Me the Free Guide',
}: InlineEmailCaptureProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await submitLead({ email: data.email, name: data.name, source });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-sm font-semibold" style={{ color: '#1B7A4E' }}>
        ✓ Check your inbox — your guide is on its way!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
      <div className="flex-1">
        <input
          {...register('email')}
          type="email"
          placeholder="Your email address"
          className="w-full px-4 py-3 rounded-lg text-sm border focus:outline-none"
          style={{ borderColor: errors.email ? '#C0392B' : '#E8E8E4', color: '#2A2A26', backgroundColor: 'white' }}
        />
        {errors.email && (
          <p className="text-xs mt-1" style={{ color: '#C0392B' }}>
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg font-semibold text-sm text-white whitespace-nowrap disabled:opacity-60"
        style={{ backgroundColor: '#C8902A' }}
      >
        {loading ? 'Sending...' : buttonText}
      </button>
    </form>
  );
}
