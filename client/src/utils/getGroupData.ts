import { User, Group } from "@/types";

export const getGroupData = async (user: User): Promise<Array<Group>> => {
  let groups: Array<Group> = [];
  try {
    const groupsResponse = await fetch(`http://localhost:3000/api/user/${user._id}/groups`);
    groups = await groupsResponse.json();
  } catch(error) {
    console.error(error);
  }

  return groups;
};
