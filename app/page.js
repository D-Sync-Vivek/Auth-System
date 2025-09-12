import Link from "next/link";
import Image from 'next/image'
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        {/* hero text */}
        <h1 className="md:text-5xl text-4xl font-bold text-[var(--text-primary)] mb-4">
          Welcome to My App
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8 px-5">
          A simple app with authentication using Next.js and JWT.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href="/signup">
            <button className="flex items-center gap-2 bg-[var(--primary)] hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition hover:cursor-pointer">
              Sign Up
              <Image
              src="/signupImage.svg"
              alt="sign up image"
              width={20}
              height={20}
              className="invert"
              />
            </button>
          </Link>
          <Link href="/login">
          <button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition hover:cursor-pointer">
            Login
            <Image
              src="/loginImage.svg"
              alt="sign up image"
              width={20}
              height={20}
              className="invert"
              />
          </button>
        </Link>
        </div>
      </div>
    </>
  );
}
