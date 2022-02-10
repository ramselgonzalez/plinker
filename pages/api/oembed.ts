import type { NextApiRequest, NextApiResponse } from "next";
import { getCharacterOverview } from "lib/characters";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string;
  const splitUrl = url.split("/");
  const cid = splitUrl[splitUrl.length - 2];
  const { id, name } = getCharacterOverview(cid);

  const oembed = {
    author_name: name,
    author_url: `https://plinker.vercel.app/${id}/overview`,
    provider_name: "Plinker, an Ultimate Marvel vs. Capcom 3 repository.",
    provider_url: "https://plinker.vercel.app",
  };

  res.status(200).json(oembed);
}
