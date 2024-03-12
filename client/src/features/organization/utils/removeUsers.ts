import { toast } from "@/components/ui/use-toast";
import { User } from "@/types";
import { capitalize } from "@/utils/capitalize";

export const removeUsers = async (
  groupId: string,
  user: User
) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ users: [user._id] }),
  };

  toast({
    title: "Success",
    description:
      capitalize(user.first_name) +
      " " +
      capitalize(user.last_name) +
      " deleted",
  });

  let response;
  try {
    //response = await fetch('http://localhost:3000/api/user')
    response = await fetch(
      `http://localhost:3000/api/group/${groupId}/removeUsers`,
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
