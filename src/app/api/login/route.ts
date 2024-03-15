import { lrstrip } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  let oauthRedirectUrl = `${req.nextUrl.origin}/api/auth/callback`;
  let localRedirectUrl = req.nextUrl.searchParams.get("redirect") ?? "/";

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!error && session) {
    return NextResponse.redirect(
      new URL(localRedirectUrl, req.nextUrl.origin),
      301
    );
  }

  const res = await supabase.auth.signInWithOAuth({
    provider: req.nextUrl.searchParams.get("provider")! as Provider,
    options: {
      redirectTo: `${oauthRedirectUrl}?redirect=${encodeURIComponent(
        localRedirectUrl === "/" ? "/" : lrstrip(localRedirectUrl)
      )}&`,
    },
  });

  return NextResponse.redirect(res.data.url!, 303);
}
