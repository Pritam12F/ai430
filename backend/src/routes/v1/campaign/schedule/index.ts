import { Router } from "express";
import { scheduleCampaignSchema } from "../../../../zod";
import { db } from "../../../../db";

export const scheduleRouter = Router();

scheduleRouter.post("/", async (req, res) => {
  const payload = req.body;
  const { success, data } = scheduleCampaignSchema.safeParse(payload);

  if (!success) {
    res.status(400).json({
      message: "Invalid input",
    });

    return;
  }

  try {
    const { campaignId, startDate, endDate } = data;

    const startDateObj = new Date(startDate!);
    const endDateObj = new Date(endDate!);
    const currentDateObj = new Date();

    if (startDateObj.getTime() < currentDateObj.getTime()) {
      res.status(402).json({
        message: "Cannot schedule campaign in the past",
      });

      return;
    }

    const udatedCampaign = await db.campaign.update({
      where: { id: campaignId },
      data: {
        startDate: startDateObj.toISOString(),
        endDate: endDateObj.toISOString(),
        status: "SCHEDULED",
      },
    });

    res.json({
      message: "Campaign scheduled successfully",
      campaignId: udatedCampaign.id,
    });
  } catch (error) {
    console.error(
      "Error scheduling campaign:",
      error instanceof Error ? error.message : "Unknown error"
    );
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
