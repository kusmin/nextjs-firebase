import { NextRequest, NextResponse } from "next/server";
import admin from "@/firebase/firebaseAdminConfig";
import { verifyIdToken } from "@/firebase/verifyIdToken";

export async function GET(req: NextRequest) {
  const decodedTokenUid = await verifyIdToken(req);
  try {
    // const decodedToken = await admin.auth().verifyIdToken(decodedTokenUid);
    const user = await admin.auth().getUser(decodedTokenUid);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
