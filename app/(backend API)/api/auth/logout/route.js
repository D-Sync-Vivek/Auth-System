import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("token", "", { maxAge: 0, path: "/" });
    return Response.json({ success: true, message: "Logged out" });
  } catch (error) {
    return Response.json({ success: false, message: "Failed to log out" });
  }
}
