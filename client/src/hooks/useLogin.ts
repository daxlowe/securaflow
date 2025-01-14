import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean);
  const { dispatch } = useAuthContext();
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    }
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));

      //@ts-expect-error Dispatch function not callable
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
