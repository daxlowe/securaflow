import { toast } from "@/components/ui/use-toast";
import { permissions } from "@/stores";
import { User } from "@/types";
import { capitalize } from "@/utils/capitalize";

export const modifyPermission = async (
  groupId: string,
  user: User,
  permission: number
) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ permission: permission }),
  };

  toast({
    title: "Success",
    description:
      "Changed " +
      capitalize(user.first_name) +
      "'s permission level to " +
      capitalize(permissions[permission].title),
  });

  let response;
  try {
    response = await fetch(
      `http://localhost:3000/api/group/${groupId}/modify/${user._id}`,
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
