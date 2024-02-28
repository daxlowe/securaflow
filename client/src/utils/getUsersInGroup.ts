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
  console.log(response);
  return response.json();
};

export default getUsersInGroup;
