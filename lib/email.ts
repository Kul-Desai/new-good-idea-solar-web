import { Resend } from "resend";

type EmailResult = {
  ok: boolean;
  fallback?: boolean;
  error?: string;
};

type SendEmailOptions = {
  subject: string;
  text: string;
  replyTo?: string;
};

const fallbackEmail = "info@goodideasolar.com";

export async function sendLeadEmail({ subject, text, replyTo }: SendEmailOptions): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || fallbackEmail;

  if (!apiKey) {
    return { ok: true, fallback: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Good Idea Solar <onboarding@resend.dev>",
      to,
      replyTo,
      subject,
      text,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Unable to send email right now." };
  }
}
