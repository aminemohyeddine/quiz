import React, { useEffect, useState } from "react";
import axios from "axios";

export const Posts: React.FC = () => {
  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );

  const checkToken = async () => {
    const data = await axios.post("http://localhost:3001/posts", {
      token: JWT_TOKEN,
    });
  };

  useEffect(() => {
    checkToken();
  }, []);
  return <div>post page</div>;
};
