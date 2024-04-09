import { User } from "@/types";

const getAllGroups = async (user: User) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_SERVER_DOMAIN}/api/group/all`,
    options
  );
  if (!response.ok) {
    throw new Error("Error fetching groups");
  }
  const data = await response.json();
  localStorage.setItem("groups", JSON.stringify(data));
  return data;
};

export default getAllGroups;
