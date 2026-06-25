import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendLeadEmail({
    subject: "New Good Idea Solar contact form message",
    replyTo: data.email,
    text: [
      "New contact form message",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Property Location: ${data.propertyLocation}`,
      `Approximate Acreage: ${data.acreage || "Not provided"}`,
      "",
      "Message:",
      data.message,
    ].join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, fallback: result.fallback });
}
