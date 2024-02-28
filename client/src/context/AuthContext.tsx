import { createContext, useReducer, useEffect, PropsWithChildren } from "react";
import { authReducer } from "./AuthReducers";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    dispatch({ type: "LOADING_COMPLETE" });
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
