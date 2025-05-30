import { Router } from "express";
import { db } from "../../../../db";
import { getCampaignSchema } from "../../../../zod";

export const fetchRouter = Router();

fetchRouter.get("/", async (req, res) => {
  const payload = req.body;

  const { success, data } = getCampaignSchema.safeParse(payload);

  if (!success) {
    res.status(400).json({ error: "Invalid inputs" });
    return;
  }

  try {
    const { campaignId } = data;

    const campaign = await db.campaign.findUnique({
      where: { id: campaignId },
      include: {
        emails: true,
      },
    });

    res.status(200).json({ message: "Summary endpoint hit", campaign });
  } catch (error) {
    console.error("Error fetching all campaigns:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

fetchRouter.get("/all", async (req, res) => {
  try {
    const campaigns = await db.campaign.findMany({
      include: {
        emails: true,
      },
    });
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching all campaigns:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
