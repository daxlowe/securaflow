import { User } from "@/types";

const getAllUsers = async (user: User) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_SERVER_DOMAIN}/api/user/all`,
    options
  );
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  const data = await response.json();
  localStorage.setItem("users", JSON.stringify(data));
  return data;
};

export default getAllUsers;
