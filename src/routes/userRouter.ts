import express from 'express';
import { verifyAuthToken } from '../middleware/authorization';
import { verifyUserPermission } from '../middleware/permission';

import {
    showAllUsers,
    showOneUser,
    createUser,
    loginUser,
    deleteUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/all', verifyAuthToken, showAllUsers);

router.get('/id/:userId', verifyAuthToken, verifyUserPermission, showOneUser);

router.post('/', createUser);

router.post('/login', loginUser);

router.delete('/id/:userId', verifyAuthToken, verifyUserPermission, deleteUser);

export default router;
