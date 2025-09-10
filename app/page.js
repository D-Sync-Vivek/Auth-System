import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        {/* hero text */}
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Welcome to My App
        </h1>
        <p className="text-gray-600 text-lg mb-8 px-5">
          A simple app with authentication using Next.js and JWT.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href="/signup">
            <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-4 py-2 rounded-lg shadow-md transition hover:cursor-pointer">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
          <button className="bg-gray-500 hover:bg-[var(--secondary-text)] text-white px-4 py-2 rounded-lg shadow-md transition hover:cursor-pointer">
            Login
          </button>
        </Link>
        </div>
      </div>
    </>
  );
}
