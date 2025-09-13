"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const isFormValid = email !== "" && password !== "";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        setEmail("");
        setPassword("");
        router.push("/protected");
      }
    } catch (error) {
      console.error("An error occurred, LoginForm");
      setMessage("An error occurred, LoginForm");
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
     

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl text-[var(--primary-text)] font-bold mb-6">
          Login Page
        </h1>

        <div className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            <span className="mb-1">E-mail</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter E-mail"
              className="border border-gray-400 px-2 py-1 rounded-md"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              className="border border-gray-400 px-2 py-1 rounded-md"
            />
          </label>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`text-white rounded-lg px-4 py-2 mt-4 transition ${
              isFormValid
                ? "cursor-pointer bg-[var(--primary)] hover:bg-indigo-700"
                : "cursor-not-allowed bg-[var(--secondary-text)]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <div className="p-4 text-center text-lg">{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
