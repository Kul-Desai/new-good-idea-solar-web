import { z } from "zod";

const emailSchema = z.string().trim().email("Enter a valid email address.");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: emailSchema,
  propertyLocation: z.string().trim().min(2, "Enter a property location."),
  acreage: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please include a short message."),
  company: z.string().optional(),
});

export const propertyAnalysisSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: emailSchema,
  phone: z.string().trim().optional(),
  propertyLocation: z.string().trim().min(2, "Enter the property location."),
  acreage: z.string().trim().min(1, "Enter approximate acreage."),
  landUse: z.string().trim().min(2, "Tell us how the land is used today."),
  message: z.string().trim().optional(),
  consent: z.literal("on", {
    error: "Please confirm Good Idea Solar may contact you about your property.",
  }),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type PropertyAnalysisInput = z.infer<typeof propertyAnalysisSchema>;
