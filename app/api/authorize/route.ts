import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();

  try {
    if (username === "smart-arena-admin" && password === "admin") {
      return NextResponse.json({
        success: true,
        name: "Smart Arena Sales Admin",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: "An error occured" });
  }
};
