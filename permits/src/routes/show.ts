import express, { Request, Response } from "express";
import { NotFoundError } from "@cygnetops/common-v2";
import { Permit } from "../models/permits";

const router = express.Router();

router.get("/api/permits/:id", async (req: Request, res: Response) => {
  const permit = await Permit.findById(req.params.id);

  if (!permit) {
    throw new NotFoundError();
  }

  res.send(permit);
});

export { router as showPermitRouter };
