import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@cygnetops/common-v2";
import { createPermitRouter } from "./routes/new";
import { showPermitRouter } from "./routes/show";
import { indexPermitRouter } from "./routes/index";
import { updatePermitRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createPermitRouter);
app.use(showPermitRouter);
app.use(indexPermitRouter);
app.use(updatePermitRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
