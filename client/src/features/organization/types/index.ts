import { Group, User } from "@/types";

export type GroupMember = {
    sharedGroups?: Array<Group>;
    user: User;
};