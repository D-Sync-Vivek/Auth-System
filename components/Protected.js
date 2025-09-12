"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Protected = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/protected", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (data.success) {
          setUserName(data.userName);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      console.log(data.message);
      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Logout Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-4 text-lg">Checking authentication.....</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div>{userName && <p>Welcome {userName}! 😁</p>} </div>
        <div className="fixed top-3 right-5">
          <button
            className="border-1 px-2 p-1 rounded-md hover:cursor-pointer bg-indigo-500 text-white hover:bg-indigo-700"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Protected;
