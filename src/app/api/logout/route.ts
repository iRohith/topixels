import { lrstrip } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  await supabase.auth.signOut();
  const redirectUrl = req.headers.get("referer") ?? req.nextUrl.origin;
  return NextResponse.redirect(lrstrip(redirectUrl, "/"), 301);
}
