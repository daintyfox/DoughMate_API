import Role from '../models/role.mjs';
import User from '../models/user.mjs';

export const getAllRoles = async (_req, res) => {
  try {
    // Query database for all roles
    return res.status(200).send(await Role.findAll());
  } catch (error) {
    // Logging error to server
    console.error('Error retrieving roles:', error);
    return res.status(500); // Internal server error
  }
};

export const getRoleById = async (req, res) => {
  const id = Number(req.params.roleId);

  // Validate id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for role
    const role = await Role.findByPk(id);

    if (!role) {
      return res.statusCode(404); // Not Found
    }

    // Send the role data to client
    return res.status(200).send(role);
  } catch (error) {
    // Logging error on server
    console.error('Error retrieving role:', error);

    return res.sendStatus(500); // Internal server error
  }
};

export const createRole = async (req, res) => {
  const { name } = req.body;

  // Validate field
  if (!name) {
    return res.sendStatus(400); // Bad Request
  }

  try {
    // Create the role on the DB.
    await Role.create({ name });
    return res.sendStatus(201);
  } catch (error) {
    // Check if the error is due to a uniqueness constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Role already exist' });
    }
    // Logging error on server
    console.error('Error creating role:', error);
    return res.sendStatus(500);
  }
};

export const updateRole = async (req, res) => {
  const roleId = Number(req.params.roleId);
  const { name } = req.body;

  // Validate fields
  if (!roleId || !name) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Update the role in the database
    const [rowsAffected] = await Role.update(
      { name },
      {
        where: { id: roleId },
        fields: ['name'],
        returning: true, // Return the updated role object
      },
    );

    // If no rows were affected, the role was not found
    if (!rowsAffected) {
      return res.sendStatus(404); // Role not found
    }

    // Send the updated role object back to the client
    return res.status(200).json(rowsAffected); // Return updated role object
  } catch (error) {
    // Check if the error is due to a uniqueness constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Role already exist' });
    }

    // Log the error on the server
    console.error('Error updating role:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export const deleteRole = async (req, res) => {
  const id = Number(req.params.roleId);

  // Validate Id parameter, id=1 'Admin', can't be deleted
  if (!id || id <= 1) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Delete the role from the database
    const rowsAffected = await Role.destroy({ where: { id } });

    // If no rows were affected, the role was not found
    if (!rowsAffected) {
      return res.sendStatus(404); // Role not found
    }

    // Send the number of affected rows back to the client
    return res.status(200).send(rowsAffected.toString());
  } catch (error) {
    // Log the error on the server
    console.error('Error deleting role:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export const assignRole = async (req, res) => {
  // Extract the ids from the request body
  const { roleId, userId } = req.body;
  const vroleId = Number(roleId);
  const vuserId = Number(userId);

  // Validate ids
  if (!vroleId || vroleId <= 0 || !vuserId || vuserId <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for the user;
    const user = await User.findByPk(vuserId);
    if (!user) {
      return res.statusCode(404); // User Not Found
    }

    // Query database for the role;
    const role = await Role.findByPk(vroleId);
    if (!role) {
      return res.statusCode(404); // Role Not Found
    }

    // Assign the role to the user TO:DO
    await user.setRole(role);
    return res.sendStatus(200); // Role assigned
  } catch (error) {
    // Logging error on server
    console.error('Error assigning role:', error);

    return res.sendStatus(500); // Internal server error
  }
};
