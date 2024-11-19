import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";
import { ProductStatus } from "@prisma/client";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (url.pathname.startsWith("/shop/")) {
    const productId = url.pathname.split("/").pop();

    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { status: true, userId: true },
      });

      if (!product) {
        return NextResponse.redirect(new URL("/404", req.url));
      }

      // Handle non-published products
      if (product.status !== ProductStatus.PUBLISHED) {
        if (!token || token.sub !== product.userId) {
          return NextResponse.redirect(new URL("/signin", req.url));
        }
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/500", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/:path*"],
};
