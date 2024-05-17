import express from 'express';
import { checkPermissions } from '../middlewares/authMiddlewares.mjs';
import { validateUserCreate, validateUserUpdate } from '../middlewares/userMiddlewares.mjs';
import {
  createRecord, getAllRecords, getRecordById, updateRecordById, deleteRecordById,
} from '../controllers/genericController.mjs';
import User from '../models/user.mjs';
import {
  deleteUserRole, getMe, getUserRole, setUserRole,
} from '../controllers/userController.mjs';

const userRouter = express.Router();

// User operations
userRouter.get('/', checkPermissions('READ_USER'), getAllRecords(User)); // Gets all Users
userRouter.get('/me', getMe); // Returns requester's profile
userRouter.get('/:id', getRecordById(User)); // Gets specified user
userRouter.post('/', validateUserCreate, createRecord(User)); // Create a new user.
userRouter.put('/:id', validateUserUpdate, updateRecordById(User)); // Updates a user
userRouter.delete('/:id', deleteRecordById(User)); // Deletes a User.

// User/Role operations
userRouter.get('/:id/role', getUserRole); // gets the user's role
userRouter.post('/:id/role/:roleId', setUserRole); // Sets a role to the user
userRouter.delete('/:id/role', deleteUserRole); // deletes the user's role

export default userRouter;
