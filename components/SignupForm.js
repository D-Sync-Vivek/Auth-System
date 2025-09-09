"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = name !== "" && email !== "" && password !== "";

  const router = useRouter();

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
  return (
    <>
      <form onSubmit={handleSubmit} className="shadow-2xl mt-5 md:w-[50vw] mx-auto">
      <div className="flex justify-center text-3xl mt-10">SignUp Page</div>
        <div className="mt-5 flex flex-col justify-center items-center ">
          <div className="flex justify-between items-center gap-5 w-[23vw] mx-auto my-2">
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
          <div className="flex justify-between items-center gap-5 w-[23vw] mx-auto my-2">
            <span>Enter E-mail</span>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter E-mail"
              className="border-1 border-gray-400 px-2 p-1 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center gap-5 w-[23vw] mx-auto my-2">
            <span>Enter Password</span>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password"
              className="border-1 border-gray-400 px-2 p-1 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`border-1 border-gray-500 px-2 p-1 rounded-md m-5 ${
              isFormValid
                ? "bg-white cursor-pointer"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            {loading ? "Signing up" : "Sign up"}
          </button>
          { message && <div className="p-10">{message}</div>}
        </div>
      </form>
    </>
  );
};

export default SignupForm;
