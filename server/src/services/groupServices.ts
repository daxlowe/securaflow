import Group, {GroupDocument} from '../models/Group';
import { FilterQuery, UpdateQuery } from 'mongoose';

export async function createGroup(input: Omit<GroupDocument, 'createdAt' | 'updatedAt'> )
{
    const group = await Group.create(input);
    return group.toJSON();
}

export async function findGroup(query: FilterQuery<GroupDocument>)
{
    return Group.find(query).lean();
}

export async function updateGroup(query: FilterQuery<GroupDocument>, update: UpdateQuery<GroupDocument>)
{
    return Group.updateOne(query, update);
}

export async function removeUsersFromGroupService(query: FilterQuery<GroupDocument>, usersToRemove: Array<string>)
{
    console.log("Query", query);
    console.log("UsersToRemove", usersToRemove);
    return await Group.findByIdAndUpdate(query, {
        $pull: {
            users: {
                $in: usersToRemove
            }
        }
    },
    {
        new: true
    });
}

export async function addUserToGroupService(query: FilterQuery<GroupDocument>, usersToAdd: Array<string>)
{
    return await Group.findByIdAndUpdate(query, {
        $addToSet: {
            users: {
                $each: usersToAdd
            }
        }
    },
    {
        new: true
    });
}