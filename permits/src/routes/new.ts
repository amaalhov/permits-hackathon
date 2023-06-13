import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@cygnetops/common-v2";
import { Permit } from "../models/permits";

const router = express.Router();

router.post(
  "/api/permits",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const permit = Permit.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await permit.save();

    res.status(201).send(permit);
  }
);

export { router as createPermitRouter };
