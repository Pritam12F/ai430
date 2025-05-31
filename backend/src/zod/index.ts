import { z } from "zod";

export const campaignTypeSchema = z.enum(["EMAIL", "SMS", "SOCIAL"]);

export const createCampaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().datetime({ offset: true }).optional(),
  endDate: z.string().datetime({ offset: true }).optional(),
  target: z.string().min(1, "Target audience is required"),
  type: campaignTypeSchema,
});

export const scheduleCampaignSchema = z.object({
  campaignId: z.string(),
  startDate: z.string().datetime({ offset: true }),
  endDate: z.string().datetime({ offset: true }),
});

export const getEmailsSchema = z.object({
  campaignId: z.string().uuid("Invalid campaign ID"),
});

export const getCampaignSchema = z.object({
  campaignId: z.string().uuid("Invalid campaign ID"),
});

export const searchCampaignsSchema = z.object({
  query: z.string().min(1, "Search query is required").optional(),
  type: campaignTypeSchema.optional(),
});
