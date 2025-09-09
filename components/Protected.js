"use client";

import React, { useEffect, useState } from "react";

const Protected = () => {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("api/protected", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
    
        if (data.success) {
          setUserName(data.userName);
          setMessage("Access granted");
        } else {
          setMessage(data.message);
        }
      } catch {
        setMessage("An error occured, protected");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex gap-5">
            {userName && <p>Welcome {userName}!</p>}  
            {/* {message && <p>{message}</p>} */}
        </div>
      </div>
    </>
  );
};

export default Protected;
