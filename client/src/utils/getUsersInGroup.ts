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
    `http://localhost:3000/api/group/${groupId}/users`,
    options
  );
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  console.log(response);
  return response.json();
};

export default getUsersInGroup;
