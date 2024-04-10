import { User } from "../types/";

export const modifyUser = async (userData: any, user: User) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(userData),
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

  return response;
};
