import { Resend } from 'resend';

const FROM = 'Colitis Help USA <noreply@colitishelpusa.com>';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 'placeholder');
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  await getResend().emails.send({
    from: FROM,
    to,
    subject: 'Your UC Care Options Check — Thank You',
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#0B2545;">Thank you, ${name || 'there'}!</h2>
        <p style="color:#5C5C56;">We've received your UC Care Options Check responses.</p>
        <p style="color:#5C5C56;">Based on your answers, we may share educational resources and, where appropriate, care-navigation options that may apply to your situation.</p>
        <p style="color:#5C5C56;">A care-navigation partner may contact you by email or phone if your responses match available options in your area.</p>
        <hr style="border:1px solid #E8E8E4;margin:24px 0;" />
        <p style="color:#C0392B;font-size:13px;"><strong>Important:</strong> This is not medical advice. If symptoms are severe or urgent, contact your doctor or seek emergency care immediately.</p>
        <p style="color:#5C5C56;font-size:12px;">Colitis Help USA — Educational guidance only. Not a medical provider.</p>
      </div>
    `,
  });
}

export async function sendLeadMagnetEmail(to: string, name: string, source: string): Promise<void> {
  const subject = source.toLowerCase().includes('flare')
    ? 'Your Free UC Flare Survival Guide'
    : source.toLowerCase().includes('question')
    ? 'Your Free GI Doctor Question Checklist'
    : source.toLowerCase().includes('treatment')
    ? 'Your Free UC Treatment Comparison Guide'
    : source.toLowerCase().includes('insurance')
    ? 'Your Free UC Insurance Navigation Guide'
    : 'Your Free UC Resource from Colitis Help USA';

  await getResend().emails.send({
    from: FROM,
    to,
    subject,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#0B2545;">Hi ${name || 'there'},</h2>
        <p style="color:#5C5C56;">Thank you for requesting your free resource from Colitis Help USA.</p>
        <p style="color:#5C5C56;">Your guide is ready — please check back on our website or look for a follow-up email with your resource download.</p>
        <hr style="border:1px solid #E8E8E4;margin:24px 0;" />
        <p style="color:#5C5C56;font-size:13px;">This resource is for educational purposes only and is not a substitute for advice from a licensed healthcare professional.</p>
        <p style="color:#5C5C56;font-size:12px;">Colitis Help USA — Educational guidance only. Not a medical provider.</p>
      </div>
    `,
  });
}
