import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center mt-10 gap-4">
        <Link href="/signup">
          <button className="border-1 border-gray-300 p-1 px-2 rounded-md cursor-pointer">Sign Up</button>
        </Link>
        <Link href="/login">
          <button className="border-1 border-gray-300 p-1 px-2 rounded-md cursor-pointer">Login</button>
        </Link>

      </div>
    </>
  );
}
