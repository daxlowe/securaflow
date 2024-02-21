import { FilterQuery, UpdateQuery } from 'mongoose';
import Session, { SessionDocument } from '../models/Session';
import { verifyJWT } from '../utils/jwt';
import { get } from 'lodash';
import { findUser } from '../services/userServices';
import { Secret } from 'jsonwebtoken';
import { signJWT } from '../utils/jwt';
import dotenv from 'dotenv';
dotenv.config();

export async function createSession(userID: string, userAgent: string)
{
    const session = await Session.create({user: userID, userAgent});
    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>)
{
    return Session.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>)
{
    return Session.updateOne(query, update);
}

export async function reIssueAccessToken({refreshToken}: {refreshToken: string})
{
    const { decoded } = verifyJWT(refreshToken);
    if(!decoded || !get(decoded, 'session')) return false;

    const session = await Session.findById(get(decoded, 'session'));
    if(!session || !session.valid) return false;

    const user = await findUser({_id: session.user})
    if(!user) return false;

    const accessExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
    const accessToken = signJWT(
        { ...user, session: session._id as Secret },
        { expiresIn: accessExpiration}  
        );

    return accessToken;
}