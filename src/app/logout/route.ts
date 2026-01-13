import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL("/", req.url);

    const res = NextResponse.redirect(url);
    res.cookies.delete("auth");

    return res;
}
