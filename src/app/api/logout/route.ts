import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { error } = await supabase.auth.signOut();
  console.log(error);
  return NextResponse.redirect(
    new URL(req.headers.get("referer") ?? req.nextUrl.origin),
    301
  );
}
