import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  // Attempt to sign out
  const signOutResult = await supabase.auth.signOut();
  console.log("Sign-out result:", signOutResult);

  // Determine the redirect URL
  const redirectUrl = req.headers.get("referer") ?? req.nextUrl.origin;
  console.log("Redirect URL:", redirectUrl);

  // Redirect the user
  const response = NextResponse.redirect(redirectUrl, 301);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}
