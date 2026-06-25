import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";
import { propertyAnalysisSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;
  const parsed = propertyAnalysisSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendLeadEmail({
    subject: "New Free Property Analysis lead",
    replyTo: data.email,
    text: [
      "New property analysis lead",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Property Location: ${data.propertyLocation}`,
      `Approximate Acreage: ${data.acreage}`,
      `Current Land Use: ${data.landUse}`,
      "",
      "Notes:",
      data.message || "Not provided",
    ].join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, fallback: result.fallback });
}
