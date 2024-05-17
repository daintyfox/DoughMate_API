import User from '../models/user.mjs';
import Role from '../models/role.mjs';
import Permission from '../models/permission.mjs';

const getMe = async (req, res) => {
  console.log('passed throught here');
  const { id } = req.decoded;
  // Validate id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for role
    const user = await User.findOne({
      where: { id },
      include: [{
        model: Role,
        include: [{
          model: Permission,
          attributes: ['name'],
        }],
      }],
    });

    if (!user) {
      return res.statusCode(404); // Not Found
    }

    // Send the record data to client
    return res.status(200).send(user);
  } catch (error) {
    // Logging error on server
    console.error('Error retrieving record:', error);
    return res.sendStatus(500); // Internal server error
  }
};

const getUserRole = async (req, res) => {
  const id = Number(req.params.id);

  // Validate id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for user
    const user = await User.findByPk(id);

    if (!user) {
      return res.statusCode(404); // Not Found
    }
    const role = await user.getRole();
    if (!role) {
      return res.statusCode(404); // Not Found
    }
    // Send the record data to client
    return res.status(200).send(role);
  } catch (error) {
    // Logging error on server
    console.error('Error retrieving record:', error);
    return res.sendStatus(500); // Internal server error
  }
};

const setUserRole = async (req, res) => {
  const { id, roleId } = req.params;
  const vid = Number(id);
  const vroleId = Number(roleId);

  // Validate id parameter
  if (!vid || vid <= 0 || !vroleId || vroleId <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for the user;
    const user = await User.findByPk(vid);
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

const deleteUserRole = async (req, res) => {
  const id = Number(req.params.id);

  // Validate id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for user
    const user = await User.findByPk(id);

    if (!user) {
      return res.statusCode(404); // Not Found
    }
    await user.setRole(null);
    // Send the record data to client
    return res.sendStatus(200);
  } catch (error) {
    // Logging error on server
    console.error('Error retrieving record:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export {
  getMe, getUserRole, setUserRole, deleteUserRole,
};
