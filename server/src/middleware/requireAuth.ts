import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { Secret } from 'jsonwebtoken';

const requireAuth = async (request: Request, response: Response, next: NextFunction) =>
{
    // Verify authentication
    const { authorization } = request.headers;
    
    if(!authorization)
        return response.status(401).json({error: 'Authorization token required'});

    const token = authorization.split(' ')[1];

    // Verify token
    try
    {
        const _id = jwt.verify(token, process.env.SECRET as Secret) as {_id: string};

        request.body.user = await User.findOne({ _id }).select('_id');
        next();

    }
    catch (error)
    {
        console.log(error);
        response.status(401).json({error: 'Request is not authorized'});
    }
}

export default requireAuth;