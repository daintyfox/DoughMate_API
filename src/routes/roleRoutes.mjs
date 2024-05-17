import express from 'express';
import {
  getAllRoles, getRoleById, createRole, updateRole, deleteRole, assignRole,
} from '../controllers/roleController.mjs';

const roleRouter = express.Router();

// Gets all roles
roleRouter.get('/', getAllRoles);

// Returns the role of the specified Id
roleRouter.get('/:roleId', getRoleById);

// Create a new role.
roleRouter.post('/', createRole);

// Updates a role
roleRouter.put('/:roleId', updateRole);

// Deletes a role.
roleRouter.delete('/:roleId', deleteRole);

// assigns a role to a user.
roleRouter.post('/assign', assignRole);

export default roleRouter;
