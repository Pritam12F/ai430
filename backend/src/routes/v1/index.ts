import { Router } from "express";
import { campaignRouter } from "./campaign";

export const v1Router = Router();

v1Router.use("/campaign", campaignRouter);
