"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const isFormValid = name !== "" && email !== "" && password !== "";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
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
      setMessage("An error occurred");
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
    <div className="min-h-screen flex items-center justify-center overflow-hidden px-3 md:px-0">

      {/* Signup form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-white/80 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-[var(--primary-text)] mt-2 mb-5">
          SignUp Page
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Fill in your credentials and click on the Sign up button
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <label>
            <span>Enter Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter UserName"
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
            />
          </label>

          <label>
            <span>Enter E-mail</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your E-mail"
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
            />
          </label>

          <label>
            <span>Enter Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Set Your Password"
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
            />
          </label>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`text-white px-4 py-2 rounded-lg mt-4 ${
              isFormValid
                ? "bg-[var(--primary)] cursor-pointer hover:bg-indigo-700"
                : "bg-[var(--secondary-text)] cursor-not-allowed"
            }`}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </div>

        {message && <div className="p-4 text-center">{message}</div>}
      </form>
    </div>
  );
};

export default SignupForm;
