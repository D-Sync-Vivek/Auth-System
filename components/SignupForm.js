'use client'
import React from "react";
import { useState } from "react";
const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = name !== "" && email !== "" && password !== "";

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
      }
    } catch (error) {
      setMessage("An error occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-3 my-2">
            <div>Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter User Name"
              className="border-1 px-2 p-1 rounded-md"
            />
            <div>E-mail</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your E-mail"
              className="border-1 px-2 p-1 rounded-md"
            />
            <div>Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              className="border-1 px-2 p-1 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`border-1 px-2 p-1 rounded-md mt-2 ${
              isFormValid
                ? "bg-white cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Signing up" : "Sign up"}
          </button>
          {<div className="mt-10">{message}</div>}
        </div>
      </form>
    </>
  );
};

export default SignupForm;
