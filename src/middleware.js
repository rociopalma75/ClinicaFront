import { NextResponse } from "next/server";

export async function middleware(request) {
    const jwt = request.cookies.get("token");
  
    if (!jwt) return NextResponse.redirect(new URL("/", request.url));

}


export const config = {
    matcher: ["/Clinica/:path*"],
};