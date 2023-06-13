import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@cygnetops/common-v2";
import { Permit } from "../models/permits";

const router = express.Router();

router.post(
  "/api/permits",
  requireAuth,
  [body("payload").not().isEmpty().withMessage("Payload is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { payload } = req.body;

    const permit = Permit.build({
      payload,
      userId: req.currentUser!.id,
    });
    await permit.save();

    res.status(201).send(permit);
  }
);

export { router as createPermitRouter };
