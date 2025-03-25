import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, name, token } = req.body;

  if (!email || !name || !token) {
    return res.status(400).json({ message: "Missing email, name, or token" });
  }

  // Configure Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Login Successful - Your JWT Token",
    text: `Hello ${name},\n\nYou have successfully logged in using Auth0.\n\nYour JWT Token:\n${token}\n\nBest Regards,\nYour App Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Email sending failed" });
  }
}
