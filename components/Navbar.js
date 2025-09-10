"use client";
import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white">
      <ul className="flex gap-5 p-3 text-md">
        <li className="bg-gray-200 py-1 px-3 rounded-lg border border-white transition-transform duration-150 text-base">
          <Link
            href="/"
            className="block transition-transform hover:scale-115 text-inherit"
          >
            Home
          </Link>
        </li>

        <li className="bg-gray-200 py-1 px-3 rounded-lg border border-white transition-transform duration-150 text-base">
          <Link
            href="/signup"
            className="block transition-transform hover:scale-115 text-inherit"
          >
            Sign Up
          </Link>
        </li>
        <li className="bg-gray-200 py-1 px-3 rounded-lg border border-white transition-transform duration-150 text-base">
          <Link
            href="/login"
            className="block transition-transform hover:scale-115 text-inherit"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
