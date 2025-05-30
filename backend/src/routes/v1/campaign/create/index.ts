import { Router } from "express";
import { createCampaignSchema } from "../../../../zod";
import { db } from "../../../../db";

export const createRouter = Router();

createRouter.post("/", async (req, res) => {
  const payload = req.body;

  const { success, data } = createCampaignSchema.safeParse(payload);

  if (!success) {
    res.status(400).json({
      message: "Invalid input",
    });

    return;
  }

  try {
    const { name, startDate, endDate, target, type } = data;

    const campaign = await db.campaign.create({
      data: {
        name,
        startDate,
        endDate,
        targetAudience: target,
        type,
      },
    });

    res.json({
      message: "Campaign created successfully",
      campaignId: campaign.id,
    });
  } catch (error) {
    console.error(
      "Error creating campaign:",
      error instanceof Error ? error.message : "Unknown error"
    );
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }

  res.status(201).json({ message: "Campaign created successfully" });
});
