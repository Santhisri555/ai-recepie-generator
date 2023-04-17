import mongooseConnect from "@/lib/mongooseConnect";
import Recepie from "@/models/Recepie";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await mongooseConnect();

  switch (method) {
    case "GET":
      try {
        const allSlugs = await Recepie.find({}).select("slug");
        res.status(200).json({ data: allSlugs.map((obj) => obj.slug) });
      } catch (error) {
        console.log("error on api:", error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
