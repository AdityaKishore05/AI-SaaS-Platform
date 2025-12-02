import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard/:path*"],
};
