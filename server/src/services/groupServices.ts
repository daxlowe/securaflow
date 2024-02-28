import Group, {GroupDocument} from '../models/Group';
import { omit } from 'lodash';
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