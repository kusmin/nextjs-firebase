import { NextRequest } from "next/server";
import admin from "./firebaseAdminConfig";

export const verifyIdToken = async (req: NextRequest) => {
  const token = req.headers.get("authorization");
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // returns userId
    return decodedToken.uid;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
