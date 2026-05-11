import { NextRequest, NextResponse } from "next/server";
import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

type AuthPayload = {
  username?: string;
  password?: string;
};

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as AuthPayload;
    const username = data.username?.trim();
    const password = data.password;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const passwordCheck = await verifyPassword(password, user.password);

    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    if (passwordCheck.needsRehash) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: await hashPassword(password),
        },
      });
    }

    return NextResponse.json(
      {
        message: "You have been signed in",
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signin error:", error);

    if (error instanceof Error) {
      if (error instanceof SyntaxError) {
        return NextResponse.json(
          { error: "Request body must be valid JSON" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to sign in" },
      { status: 500 }
    );
  }
}
