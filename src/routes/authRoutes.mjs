import express from 'express';
import { login, logout } from '../controllers/authController.mjs';

const authRouter = express.Router();

// Route for login in the user.
authRouter.post('/login', login);

// Route for loggin out the user.
authRouter.delete('/logout', logout);

export default authRouter;
