import { toast } from "@/components/ui/use-toast";
import { Group, User } from "../types";

export const modifyGroups = async (groupData: Group[], user: User) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(groupData),
  };

  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/group/`,
      options
    );
  } catch (error) {
    console.error(error);
    throw error;
  }

  if (!response.ok) {
    toast({ title: "Failure", description: response.statusText });
    throw new Error(response.statusText);
  }

  toast({ title: "Success", description: "Teams were updated" });

  return response;
};
