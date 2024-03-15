import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }

  const redirectUrl = (req.headers.get("referer") ?? "/").replace(
    req.nextUrl.origin,
    ""
  );
  return NextResponse.redirect(
    new URL(
      `/login?redirect=${encodeURIComponent(redirectUrl)}`,
      req.nextUrl.origin
    ),
    301
  );
}
