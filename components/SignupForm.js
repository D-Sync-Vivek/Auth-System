"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const isFormValid = name !== "" && email !== "" && password !== "";

  const router = useRouter();

   // Effect to simulate loading on page load
  useEffect(() => {
    // Simulate loading delay (e.g., 1 second)
    const timer = setTimeout(() => setLoading(false), 500);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        setName("");
        setEmail("");
        setPassword("");
        router.push("/login");
      }
    } catch (error) {
      setMessage("An error occured");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-4 text-lg">loading....</span>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center min-h-screen mx-auto"
      >
        <h1 className="text-3xl font-bold text-[var(--primary-text)] mt-10">
        SignUp Page
      </h1>

        <div className="mt-5 flex flex-col justify-center items-center ">
          <div className="flex flex-col justify-between md:items-start   mx-auto my-2">
            <span>Enter Name</span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Enter UserName"
              className="border-1 border-gray-400 px-2 p-1 rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between md:items-start   mx-auto my-2">
            <span>Enter E-mail</span>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter Your E-mail"
              className="border-1 border-gray-400 px-2 p-1 rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between md:items-start mx-auto my-2">
            <span>Enter Password</span>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Set Your Password"
              className="border-1 border-gray-400 px-2 p-1 rounded-md"
            />
          </div>
          <div className="signup-btn">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`text-white border-1 border-gray-500 px-4 py-2 rounded-lg m-5 ${
                isFormValid
                  ? "bg-[var(--primary)] cursor-pointer"
                  : "bg-[var(--secondary-text)] cursor-not-allowed"
              }`}
            >
              {loading ? "Signing up" : "Sign up"}
            </button>
          </div>
          {message && <div className="p-10">{message}</div>}
        </div>
      </form>
    </>
  );
};

export default SignupForm;
