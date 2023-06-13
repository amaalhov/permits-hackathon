import express, { Request, Response } from "express";
import { Permit } from "../models/permits";

const router = express.Router();

router.get("/api/permits", async (req: Request, res: Response) => {
  const permits = await Permit.find({});

  res.send(permits);
});

export { router as indexPermitRouter };
