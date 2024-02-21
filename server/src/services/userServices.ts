import User, { UserDocument } from '../models/User';
import { omit } from 'lodash';
import { FilterQuery } from 'mongoose';

export async function createUserDB(input: Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>)
{
    try
    {
        const user = await User.create(input);

        return omit(user.toJSON(), 'password');
    }
    catch(error: any)
    {
        throw new Error(error);
    }
}

export async function validatePassword({
    email, password,
}: {
    email: string; 
    password: string;
}) {
    const user = await User.findOne({email});
    if(!user) return false;

    const isValid = await user.comparePassword(password);

    if(!isValid) return false;
    return omit(user.toJSON(), 'password');
}

export async function findUser(query: FilterQuery<UserDocument>)
{
    return User.findOne(query);
}