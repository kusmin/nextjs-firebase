import { NextRequest, NextResponse } from "next/server";
import admin from "@/firebase/firebaseAdminConfig";
import { verifyIdToken } from "@/firebase/verifyIdToken";

// type ReqBody = {
//   idToken: string;
// };

export async function GET(req: NextRequest) {
  const decodedTokenUid = await verifyIdToken(req);
  // const body: ReqBody = await req.json();
  // const { idToken } = body;

  console.log(decodedTokenUid);
  try {
    // const decodedToken = await admin.auth().verifyIdToken(decodedToken);
    return NextResponse.json({ uid: decodedTokenUid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
