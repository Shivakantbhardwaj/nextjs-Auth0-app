import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch access token" });
  }
}
