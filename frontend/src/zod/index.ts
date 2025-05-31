import { z } from "zod";

export const campaignTypeSchema = z.enum(["EMAIL", "SMS", "SOCIAL"]);

export const createCampaignFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  target: z.string().min(1, "Target audience is required"),
  type: campaignTypeSchema,
});
