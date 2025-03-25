import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

function Index() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const sendLoginEmail = async () => {
      if (user) {
        try {
          const response = await fetch("/api/auth/token");
          const { accessToken } = await response.json();

          await axios.post("/api/send-email", {
            email: user.email,
            name: user.name,
            token: accessToken,
          });
        } catch (error) {
          console.error("Error sending login email:", error);
        }
      }
    };

    sendLoginEmail();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <br />
        Your nickname is {user.nickname}.
      </div>
    );
  }
  return <a href="/api/auth/login">Login</a>;
}

export default Index;
