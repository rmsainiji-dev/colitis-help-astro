'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuizStore } from '@/lib/quizStore';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  bestContactTime: z.string().min(1, 'Please select a time'),
});

type FormData = z.infer<typeof schema>;

export default function QuizStep7Contact() {
  const { answers, updateAnswers, nextStep, prevStep } = useQuizStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: answers.fullName || '',
      email: answers.email || '',
      phone: answers.phone || '',
      bestContactTime: answers.bestContactTime || '',
    },
  });

  const onSubmit = (data: FormData) => {
    updateAnswers(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-1" style={{ color: '#0B2545' }}>
        How can we reach you?
      </h2>
      <p className="text-sm mb-5" style={{ color: '#5C5C56' }}>
        Required to send your educational guide and any relevant options
      </p>
      <div className="space-y-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#0B2545' }}>Full name *</label>
          <input
            {...register('fullName')}
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none"
            style={{ borderColor: errors.fullName ? '#C0392B' : '#E8E8E4', backgroundColor: 'white' }}
          />
          {errors.fullName && <p className="text-xs mt-1" style={{ color: '#C0392B' }}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#0B2545' }}>Email address *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none"
            style={{ borderColor: errors.email ? '#C0392B' : '#E8E8E4', backgroundColor: 'white' }}
          />
          {errors.email && <p className="text-xs mt-1" style={{ color: '#C0392B' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#0B2545' }}>Phone number (optional)</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="10-digit US number"
            className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none"
            style={{ borderColor: '#E8E8E4', backgroundColor: 'white' }}
          />
          <p className="text-xs mt-1" style={{ color: '#5C5C56' }}>
            Your phone number is optional but allows a care-navigation partner to reach you if relevant options are available.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#0B2545' }}>Best time to contact</label>
          <div className="flex flex-wrap gap-4">
            {['Morning', 'Afternoon', 'Evening', 'Weekends'].map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  {...register('bestContactTime')}
                  type="radio"
                  value={t}
                  style={{ accentColor: '#C8902A' }}
                />
                {t}
              </label>
            ))}
          </div>
          {errors.bestContactTime && (
            <p className="text-xs mt-1" style={{ color: '#C0392B' }}>{errors.bestContactTime.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={prevStep} className="flex-1 py-3 rounded-lg font-semibold text-sm border" style={{ borderColor: '#0B2545', color: '#0B2545' }}>← Back</button>
        <button type="submit" className="flex-1 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#C8902A' }}>Continue →</button>
      </div>
    </form>
  );
}
