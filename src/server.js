import express from "express";
import cors from "cors";
import pino from "pino-http";
import { errorHandler } from "./middlewares/errorHandler.js";
import { sendMail } from "./utils/sendMail.js";
import { env } from "./utils/env.js";

export const serverSetup = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pino());

  app.post("/send-mail", async (req, res, next) => {
    try {
      await sendMail(req.body);
      res.status(200).json({
        status: 200,
        message: "email send succesfully ",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);

  app.listen(Number(env("PORT")), () =>
    console.log("server runnig on 3000 port")
  );
};
