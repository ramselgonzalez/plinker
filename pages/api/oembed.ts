import type { NextApiRequest, NextApiResponse } from "next";
import { getCharacterOverview } from "lib/characters";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string;
  const hostname = process.env.NEXT_PUBLIC_HOST + "/";
  const [cid] = url.replace(hostname, "").split("/");
  const { id, name } = getCharacterOverview(cid);

  const oembed = {
    author_name: name,
    author_url: `https://plinker.vercel.app/${id}/overview`,
    provider_name: "Plinker",
    provider_url: "https://plinker.vercel.app",
  };

  res.status(200).json(oembed);
}
