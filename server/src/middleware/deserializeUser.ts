import { Request, Response, NextFunction } from "express";
import { get } from 'lodash';
import { verifyJWT } from "../utils/jwt";
import { reIssueAccessToken } from "../services/sessionServices";

const deserializeUser = async (request: Request, response: Response, next: NextFunction) =>
{
    console.log(request);
    const accessToken = get(request, "cookies.accessToken") || get(request, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(request, "cookies.refreshToken") ||get(request, "headers.x-refresh") as string;
    
    if(!accessToken) return next();

    const {decoded, expired} = verifyJWT(accessToken);
    if(decoded)
    {
        response.locals.user = decoded;
        return next();
    }

    if(expired && refreshToken)
    {
        const newAccessToken = await reIssueAccessToken({ refreshToken } );
        if(newAccessToken)
        {
            response.cookie("accesstoken", newAccessToken, {
                maxAge: 900000, // 15 min
                httpOnly: true,
                domain: "localhost",
                path: "/",
                sameSite: "strict",
                secure: false,
            })
        }
        
        const result = verifyJWT(newAccessToken as string);
    
        response.locals.user = result.decoded;
    }
    

    return next();
}

export default deserializeUser;