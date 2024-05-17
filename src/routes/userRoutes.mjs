import express from 'express';
import { checkPermissions } from '../middlewares/authMiddlewares.mjs';
import { validateUserCreate, validateUserUpdate } from '../middlewares/userMiddlewares.mjs';
import {
  createRecord, getAllRecords, getRecordById, updateRecordById, deleteRecordById,
} from '../controllers/genericController.mjs';
import User from '../models/user.mjs';
import getMe from '../controllers/userController.mjs';

const userRouter = express.Router();

// Gets all users
userRouter.get('/', checkPermissions('READ_USER'), getAllRecords(User));

// Returns the user of the specified Id
userRouter.get('/:id', getRecordById(User));

// Create a new user.
userRouter.post('/', validateUserCreate, createRecord(User));

// Updates a user
userRouter.put('/:id', validateUserUpdate, updateRecordById(User));

// Deletes a User.
userRouter.delete('/:id', deleteRecordById(User));

// Returns logged in users profile
userRouter.get('/profile', getMe);

export default userRouter;
