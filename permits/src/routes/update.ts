import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@cygnetops/common-v2";
import { Permit } from "../models/permits";

const router = express.Router();

router.put(
  "/api/permits/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      throw new NotFoundError();
    }

    if (permit.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    permit.set({
      title: req.body.title,
      price: req.body.price,
    });
    await permit.save();

    res.send(permit);
  }
);

export { router as updatePermitRouter };
