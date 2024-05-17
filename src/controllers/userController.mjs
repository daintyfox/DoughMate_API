import User from '../models/user.mjs';
import Role from '../models/role.mjs';
import Permission from '../models/permission.mjs';

const getMe = async (req, res) => {
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

export default getMe;
