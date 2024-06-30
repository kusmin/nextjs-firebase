import { NextResponse } from "next/server";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

type ReqBody = {
  email: string;
  password: string;
};

export async function POST(req: Request, res: Response) {
  const body: ReqBody = await req.json();
  const { email, password } = body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    return NextResponse.json({ idToken });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
