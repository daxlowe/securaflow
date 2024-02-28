import { User } from "@/types";

const getUsersInGroup = async (user: User, groupId: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_SERVER_DOMAIN}/api/group/${groupId}/users`,
    options
  );
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  const data = await response.json();
  localStorage.setItem("users", JSON.stringify(data));
  return data;
};

export default getUsersInGroup;
