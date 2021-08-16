import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/userTypes';

const verifyUserPermission = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = parseInt(req.params.userId);
        const authorizationHeader = req.headers.authorization || '';
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.decode(token) as { user: User };
        if (id == decoded.user.id) {
            next();
        } else {
            res.status(401);
            res.json('Unauthorized');
        }
    } catch (error) {
        res.status(401);
        res.json('Unauthorized');
    }
};

export { verifyUserPermission };
