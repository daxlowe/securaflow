import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean);
  const { dispatch } = useAuthContext();
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post("http://localhost:3000/api/session/", 
    JSON.stringify({ email, password }),
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })

   /* const response = await fetch("http://localhost:3000/api/session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "same-origin"
    });*/

    const data = await response.data;
    console.log(data);
    if (response.status !== 200) {
      setError(data.error);
      setIsLoading(false);
    }
    if (response.status === 200) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));

      //@ts-expect-error Dispatch function not callable
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
