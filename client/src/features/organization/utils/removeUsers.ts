import { toast } from "@/components/ui/use-toast";
import { User } from "@/types";
import { capitalize } from "@/utils/capitalize";

export const removeUsers = async (userToDelete: User, user: User) => {
  console.log(user);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/user/${userToDelete._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    toast({
      title: "Success",
      description:
        capitalize(userToDelete.first_name) +
        " " +
        capitalize(userToDelete.last_name) +
        " deleted",
    });

    return response;
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Failed to remove user. Please try again later.",
    });
    throw error;
  }
};
