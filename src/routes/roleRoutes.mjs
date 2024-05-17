import express from 'express';
import Role from '../models/role.mjs';
import { getRolePermission, setRolePermission, deleteRolePermission } from '../controllers/roleController.mjs';
import {
  createRecord, getAllRecords, getRecordById, updateRecordById, deleteRecordById,
} from '../controllers/genericController.mjs';
import validateRoleName from '../middlewares/roleMiddlewares.mjs';

const roleRouter = express.Router();

// Role operations
roleRouter.get('/', getAllRecords(Role)); // Gets all roles
roleRouter.get('/:id', getRecordById(Role)); // Returns the role of the specified Id
roleRouter.post('/', validateRoleName, createRecord(Role)); // Create a new role.
roleRouter.put('/:id', validateRoleName, updateRecordById(Role)); // Updates a role
roleRouter.delete('/:id', deleteRecordById(Role)); // Deletes a role.

// Role/Permission operations
roleRouter.get('/:id/permissions', getRolePermission); // Gets all related permissions
roleRouter.post('/:id/permissions/:permission', setRolePermission); // Adds permission to role
roleRouter.delete('/:id/permissions/:permission', deleteRolePermission); // Removes permission from role

export default roleRouter;
