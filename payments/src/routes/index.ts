import express, { Request, Response } from "express";
import { Payment } from "../models/payment";

const router = express.Router();

router.get("/api/payment", async (req: Request, res: Response) => {
  const payment = await Payment.find({});

  res.send(payment);
});

export { router as indexPaymentRouter };
