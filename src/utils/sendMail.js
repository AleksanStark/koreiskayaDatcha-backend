import nodemailer from "nodemailer";
import { env } from "./env.js";
import createHttpError from "http-errors";

export const sendMail = async ({
  name,
  email,
  phoneNumber,
  description,
  telegram,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port: Number(env("SMTP_PORT")),
      auth: {
        user: env("SMTP_USER"),
        pass: env("SMTP_PWD"),
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      subject: `Request from ${name}`,
      to: env("SMTP_TO"),
      html: `
      <h1> Name: ${name}</h1>
      <h2> Phone number: ${phoneNumber}</h2>
      <h2>Email: ${email}</h2>
      <h2>Telegram: ${telegram}</h2>
      <p> Problems: ${description}</p>
      `,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error while sending email:", error);
    throw createHttpError(
      500,
      "Failed to send the email, please try again later."
    );
  }
};
