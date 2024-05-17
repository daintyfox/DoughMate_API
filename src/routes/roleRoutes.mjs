import express from 'express';
import Role from '../models/role.mjs';
import { assignRole, assignPermission } from '../controllers/roleController.mjs';
import {
  createRecord, getAllRecords, getRecordById, updateRecordById, deleteRecordById,
} from '../controllers/genericController.mjs';
import validateRoleName from '../middlewares/roleMiddlewares.mjs';

const roleRouter = express.Router();

// Gets all roles
roleRouter.get('/', getAllRecords(Role));

// Returns the role of the specified Id
roleRouter.get('/:id', getRecordById(Role));

// Create a new role.
roleRouter.post('/', validateRoleName, createRecord(Role));

// Updates a role
roleRouter.put('/:id', validateRoleName, updateRecordById(Role));

// Deletes a role.
roleRouter.delete('/:id', deleteRecordById(Role));

// assigns a role to a user.
roleRouter.get('/assign', assignRole);

// TO:DO thing of a better route
roleRouter.post('/permission', assignPermission);

export default roleRouter;
