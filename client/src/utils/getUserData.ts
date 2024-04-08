import { User } from "../types/";

export const getUserData = async (user: User) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/user/`,
      options
    );
  } catch (error) {
    console.error(error);
    throw error;
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const userData: any = await response.json();

  return userData;
};
