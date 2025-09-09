import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // Read the token.
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // if no token return 401 unauthorised.
    console.log("Checking token")
    if (!token) {
      return Response.json(
        {
          success: false,
          message: "No token",
        },
        { status: 401 }
      );
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({
      success: true,
      message: "Welcome to the protected",
      userId: decoded.id,
      userName: decoded.name,
    })

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Invalid or expire token",
      },
      { status: 401 }
    );
  }
}
