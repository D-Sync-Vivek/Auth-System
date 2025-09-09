import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return Response.json(
        { success: false, message: "User does not exist." },
        { status: 400 }
      );
    }

    const isPassword = await bcrypt.compare(body.password, user.password);
    if (!isPassword) {
      return Response.json(
        { success: false, message: "Wrong password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { id: user._id.toString(), name: user.name},
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return Response.json(
      { success: true, message: "Found the user" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        success: false,
        message: "Error, couldn't find the user.",
      },
      { status: 500 }
    );
  }
}
