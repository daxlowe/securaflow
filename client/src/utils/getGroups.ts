import { User, Group } from "@/types";

export const getGroups = async (user: User): Promise<Array<Group>> => {
  let groups: Array<Group> = [];

  try {
    const groupsResponse = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/user/groups`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    groups = await groupsResponse.json();
  } catch (error) {
    console.error(error);
  }

  return groups;
};
