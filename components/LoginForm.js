"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isFormValid =  email !== "" && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("api/auth/login", {
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
      console.error("An error occured, Loginform");
      setMessage("An error occured, Loginform");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="mt-5 shadow-2xl w-[50vw] mx-auto" onSubmit={handleSubmit}>
        <div className="text-3xl flex justify-center mt-10">Login Page</div>
        <div className="mt-6 flex flex-col items-center gap-4 w-[50vw] mx-auto">
          <div className="flex justify-between items-center gap-5 w-[23vw] mx-auto">
            <span>E-mail</span>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Enter E-mail"
              className="border-1 border-gray-400 px-2 p-1 rounded-md"
            />
          </div>
          <div className=" flex justify-between items-center gap-5 w-[23vw] mx-auto">
            <span>Password</span>
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
            className={`border-1 border-gray-500  disabled rounded-md px-2 p-1 m-5 ${isFormValid? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-200"}`}
          >
            {loading ? "Logging in" : "Login"}
          </button>
         { message && <div className="p-8"> {message} </div>}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
