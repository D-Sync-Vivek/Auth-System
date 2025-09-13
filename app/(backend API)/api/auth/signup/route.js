import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from 'bcrypt'

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return Response.json({ success: false, message: "Email already exists"}, {status: 400});
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword, // storing the hashed password.
    });

    return Response.json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      message: "An error occured during signup",
    });
  }
}
