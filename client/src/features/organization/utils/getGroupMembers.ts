import { User } from "@/types";
import { Group } from "@/types";
import { getUsers } from "@/utils/getUsers";
import { GroupMember } from "../types";

export async function getGroupMembers(user: User): Promise<GroupMember[]> {
  const groups: Array<Group> = user.groups;
  const users: Array<User> = await getUsers(groups);

  let teamMembers: GroupMember[] = [];
  for (const user of users) {
    const sharedGroups: Array<Group> = user.groups.filter((group) => {
      return user.groups.includes(group);
    });

    teamMembers.push({
      sharedGroups: sharedGroups,
      user: user,
    });
  }

  return teamMembers;
}