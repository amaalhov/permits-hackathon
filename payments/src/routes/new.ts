import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@cygnetops/common-v2";
import { Payment } from "../models/payment";

const router = express.Router();

router.post(
  "/api/payment",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, amount } = req.body;

    const payment = Payment.build({
      title,
      amount,
      userId: req.currentUser!.id,
    });
    await payment.save();

    res.status(201).send(payment);
  }
);

export { router as createPaymentRouter };
