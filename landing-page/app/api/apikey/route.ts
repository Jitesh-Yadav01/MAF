import { auth0 } from "@/lib/auth0";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth0.getSession(request);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Generate a one-off API key (for demo purposes only).
  // For a real app, persist keys and associate them with the user.
  const key = randomBytes(16).toString('hex');

  return NextResponse.json({ key });
}
