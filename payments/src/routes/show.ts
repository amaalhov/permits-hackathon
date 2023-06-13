import express, { Request, Response } from "express";
import { NotFoundError } from "@cygnetops/common-v2";
import { Payment } from "../models/payment";

const router = express.Router();

router.get("/api/payment/:id", async (req: Request, res: Response) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    throw new NotFoundError();
  }

  res.send(payment);
});

export { router as showPaymentRouter };
