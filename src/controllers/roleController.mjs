import Role from '../models/role.mjs';
import permissions from '../config/permissions.mjs';
import Permission from '../models/permission.mjs';

const getRolePermission = async (req, res) => {
  const id = Number(req.params.id);
  if (!id || !id <= 0) {
    return res.sendStatus(400); // Bad request
  }
  try {
    const role = await Role.findOne({ where: { id } });
    const npermissions = await role.getPermissions();
    return res.status(200).send(npermissions);
  } catch (error) {
    // Logging error on server
    console.error('Error getting perms:', error);
    return res.sendStatus(500); // Internal server error
  }
};

const setRolePermission = async (req, res) => {
  const { id, permission } = req.params;
  const vid = Number(id);
  // Validate ids
  if (!vid || vid <= 0 || !permissions.includes(permission)) {
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

const deleteRolePermission = async (req, res) => {
  const { id, permission } = req.params;
  const vid = Number(id);
  // Validate ids
  if (!vid || vid <= 0 || !permissions.includes(permission)) {
    return res.sendStatus(400); // Bad request
  }
  try {
    const role = await Role.findOne({ where: { id } });
    const foundPermission = await Permission.findOne({ where: { name: permission } });
    role.removePermission(foundPermission);
    return res.sendStatus(200);
  } catch (error) {
    // Logging error on server
    console.error('Error removing perm:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export { getRolePermission, setRolePermission, deleteRolePermission };
