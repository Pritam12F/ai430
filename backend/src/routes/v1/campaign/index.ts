import { Router } from "express";
import { fetchRouter } from "./fetch";
import { emailsRouter } from "./emails";
import { searchRouter } from "./search";

export const campaignRouter = Router();

campaignRouter.use("/summary", fetchRouter);
campaignRouter.use("/emails", emailsRouter);
campaignRouter.use("/search", searchRouter);
