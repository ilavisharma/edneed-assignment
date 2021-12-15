import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../types/User";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: User[] = req.body;
  const { db } = await connectToDatabase();

  const response = await db.collection("users").insertMany(data);

  res.json(response);
}
