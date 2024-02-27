import { Request, Response } from "express";
import { validatePassword } from "../services/userServices";
import { createSession, findSessions, updateSession } from "../services/sessionServices";
import { signJWT } from "../utils/jwt";
import { Secret } from 'jsonwebtoken';

export async function createUserSession(request: Request, response: Response)
{
    console.log("In create session #1");
    // Validate Users password
    const user = await validatePassword(request.body);
    if(!user)
    {
        return response.status(401).send("Invalid email or password");
    }
    // Create a session
    const session = await createSession(user._id, request.get("user-agent") || '');
    // Create an access token

    const accessExpiration = process.env.ACCESS_TOKEN_EXPIRATION as string;
 
    const accessToken = signJWT(
       { ...user, session: session._id as Secret },
       { expiresIn: accessExpiration}  
       );
    
    // Create a refresh token
    const refreshExpiration = process.env.REFRESH_TOKEN_EXPIRATION as string;
    const refreshToken = signJWT(
       { ...user, session: session._id },
       { expiresIn: refreshExpiration}  
       );
    const userID = user._id

    // Return access and refresh tokens
    response.cookie("accesstoken", accessToken, {
        maxAge: 900000, // 15 min
        sameSite: "lax",
        secure: false,
    })

    response.cookie("refreshtoken", refreshToken, {
        maxAge: 3.154e10, // 15 min
        sameSite: "lax",
        secure: false,
    })
    console.log("In create session #2");
    return response.send({accessToken, refreshToken, userID});
}

export async function getUserSessions(request: Request, response: Response)
{
    const userID = response.locals.user._id;
    const sessions = await findSessions({user: userID, valid: true});
    return response.send(sessions);
}

export async function deleteSession(request: Request, response: Response)
{
    const sessionID = response.locals.user.session;

    await updateSession({_id: sessionID}, {valid: false});
    return response.send(
        {
            accessToken: null, 
            refreshToken: null
        }
    )
}