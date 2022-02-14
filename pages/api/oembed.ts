import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    author_name: "Plinker, an Ultimate Marvel vs. Capcom 3 repository.",
    author_url: `https://plinker.vercel.app/`,
    provider_name: "Plinker",
  });
}
