import { Router } from "express";
import { db } from "../../../../db";

export const emailsRouter = Router();

emailsRouter.get("/", async (req, res) => {
  try {
    const emails = await db.email.findMany({
      include: {
        campaign: true,
      },
    });

    if (!emails) {
      res.status(404).json({ error: "No emails found for this campaign" });
      return;
    }

    res.status(200).json({ emails });
  } catch (error) {
    console.error(
      "Error fetching emails:",
      error instanceof Error ? error.message : "Unknown error"
    );
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});
