import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/types';
import { UserModel } from '../models/userModel';

const userModel = new UserModel();

const showAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userModel.index();
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const showOneUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.userId);
        const user = await userModel.showById(id);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUserData: User = req.body;
        const newUser = await userModel.create(newUserData);
        const token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string
        );
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await userModel.showByUsername(username, password);
        if (user) {
            const token = jwt.sign(
                { user: user },
                process.env.TOKEN_SECRET as string
            );
            res.json(token);
        } else {
            res.status(401);
            res.json('Access denied');
        }
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.userId);
        const deletedUser = await userModel.delete(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

export { showAllUsers, showOneUser, createUser, loginUser, deleteUser };
