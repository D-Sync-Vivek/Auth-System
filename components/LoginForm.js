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

  useEffect(() =>{
     const timer = setTimeout(() => setLoading(false), 1000);
    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);


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

  if(loading){
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
        className="flex flex-col justify-center items-center min-h-screen md:w-[50vw] mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="text-3xl text-[var(--primary-text)] font-bold flex justify-center mt-10">
          Login Page
        </div>
        <div className="mt-6 flex flex-col items-center gap-4 md:w-[50vw] mx-auto">
          <div className="flex flex-col justify-between m-auto">
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
          <div className=" flex flex-col justify-between m-auto">
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
            className={`border-1 border-gray-500 text-white disabled rounded-lg px-4 py-2 m-2 ${
              isFormValid
                ? "cursor-pointer bg-[var(--primary)]"
                : "cursor-not-allowed bg-[var(--secondary-text)]"
            }`}
          >
            {loading ? "Logging in" : "Login"}
          </button>
          {message && <div className="p-4 text-xl"> {message} </div>}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
