import { User } from "@/types";
import { Group } from "@/types";
import { getGroupData } from "@/utils/getGroupData";

export async function getGroups(user: User): Promise<Group[]> {
  const groups: Group[] = await getGroupData(user);
  return groups;
}