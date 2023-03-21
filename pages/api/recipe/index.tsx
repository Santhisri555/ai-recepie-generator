import mongooseConnect from "@/lib/mongooseConnect";
import Recepie from "@/models/Recepie";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createRecepieDtoSchema } from "./dto/createRecepie.dto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    switch (method) {
      case "GET":
        try {
          const query = { email: session.user.email };
          const recepies = await Recepie.find(query);
          res.status(200).json({ data: recepies });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case "POST":
        try {
          const parsedDto = createRecepieDtoSchema.parse(req.body);

          const recepie = await Recepie.create({
            ...parsedDto,
            email: session.user.email,
            _id: new ObjectId(),
          });
          res.status(201).json({ data: recepie });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      case "PUT":
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false });
  }
}
