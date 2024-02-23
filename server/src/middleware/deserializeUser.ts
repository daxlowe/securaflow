import { Request, Response, NextFunction } from "express";
import { get } from 'lodash';
import { verifyJWT } from "../utils/jwt";
import { reIssueAccessToken } from "../services/sessionServices";

const deserializeUser = async (request: Request, response: Response, next: NextFunction) =>
{
    const accessToken = get(request, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(request, "headers.x-refresh") as string;
    
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
            response.setHeader('x-access-token', newAccessToken);
        }
        
        const result = verifyJWT(newAccessToken as string);
    
        response.locals.user = result.decoded;
    }
    

    return next();
}

export default deserializeUser;