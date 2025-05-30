import { Router } from "express";
import { searchCampaignsSchema } from "../../../../zod";
import Fuse from "fuse.js";
import { db } from "../../../../db";

export const searchRouter = Router();

searchRouter.get("/", async (req, res) => {
  const payload = req.body;

  const { success, data } = searchCampaignsSchema.safeParse(payload);
  if (!success) {
    res.status(400).json({ error: "Invalid inputs" });
    return;
  }

  try {
    const campaigns = await db.campaign.findMany({
      select: {
        name: true,
        type: true,
      },
    });

    const { type, query } = data;
    if (type && query) {
      const filteredCampaigns = campaigns.filter((x) => x.type === type);
      const fuse = new Fuse(filteredCampaigns, { keys: ["name"] });
      const searchResults = fuse.search(query);

      res.json({ message: "Search successfull", searchResults });
      return;
    } else if (type && !query) {
      const filteredCampaigns = campaigns.filter((x) => x.type === type);
      res.json({ message: "Search successfull", campaigns: filteredCampaigns });
      return;
    } else if (!type && query) {
      const fuse = new Fuse(campaigns, { keys: ["name"] });
      const searchResults = fuse.search(query);

      res.json({ message: "Search successfull", searchResults });
      return;
    }
  } catch (err) {
    console.error("Error searching campaigns:", err);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});
