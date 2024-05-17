import Role from '../models/role.mjs';
import User from '../models/user.mjs';
import permissions from '../config/permissions.mjs';
import Permission from '../models/permission.mjs';

const assignRole = async (req, res) => {
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

const assignPermission = async (req, res) => {
  const { roleId, permission } = req.body;
  const id = Number(roleId);
  // Validate ids
  if (!id || id <= 0 || !permissions.includes(permission)) {
    return res.sendStatus(400); // Bad request
  }
  try {
    const role = await Role.findOne({ where: { id } });
    const foundPermission = await Permission.findOne({ where: { name: permission } });
    role.setPermission(foundPermission);
    return res.sendStatus(200);
  } catch (error) {
    // Logging error on server
    console.error('Error assigning perm:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export { assignRole, assignPermission };
