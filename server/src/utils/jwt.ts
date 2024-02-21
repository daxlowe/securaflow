import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as fs  from 'fs'
dotenv.config();

const privateKey = process.env.PRIVATE_KEY as string;
const publicKey = process.env.PUBLIC_KEY as Secret;
export function signJWT(object: Object, options?: jwt.SignOptions | undefined)
{
    return jwt.sign(object, privateKey, {
        ...(options && options), 
        algorithm: "RS256",
    });
}

export function verifyJWT(token: string)
{
    try
    {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true, 
            expired: false, 
            decoded
        }
    }
    catch (error: any)
    {
        return {
            valid: false, 
            expired: error.message === 'jwt expired', 
            decoded: null
        }
    }
}