import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    const adminPassword =
      process.env.ADMIN_PASSWORD || "admin123";

    if (password !== adminPassword) {
      // Small artificial delay to prevent brute force
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Set session cookie
    const cookieStore = cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
