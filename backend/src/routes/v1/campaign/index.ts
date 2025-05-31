import { Router } from "express";
import { fetchRouter } from "./fetch";
import { emailsRouter } from "./emails";
import { searchRouter } from "./search";
import { createRouter } from "./create";
import { scheduleRouter } from "./schedule";

export const campaignRouter = Router();

campaignRouter.use("/summary", fetchRouter);
campaignRouter.use("/emails", emailsRouter);
campaignRouter.use("/search", searchRouter);
campaignRouter.use("/create", createRouter);
campaignRouter.use("/schedule", scheduleRouter); // Assuming schedule uses the same create logic for now
