import User from '../models/user.mjs';

export const getAllUsers = async (_req, res) => {
  try {
    // Query database for all users
    return res.status(200).send(await User.findAll());
  } catch (error) {
    // Logging error to server
    console.error('Error retrieving users:', error);
    return res.status(500); // Internal server error
  }
};

export const getUserById = async (req, res) => {
  const id = Number(req.params.userId);

  // Validate id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for User
    const user = await User.findByPk(id);

    if (!user) {
      return res.statusCode(404); // Not Found
    }

    // Send the user data to client
    return res.status(200).send(user);
  } catch (error) {
    // Logging error on server
    console.error('Error retrieving user:', error);

    return res.sendStatus(500); // Internal server error
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate fields
  if (!username || !password) {
    return res.sendStatus(400); // Bad Request
  }

  try {
    // Create the user on the DB.
    await User.create({ username, password });
    return res.sendStatus(201);
  } catch (error) {
    // Check if the error is due to a uniqueness constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Username is already taken' });
    }
    // Logging error on server
    console.error('Error creating user:', error);
    return res.sendStatus(500);
  }
};

export const updateUser = async (req, res) => {
  const userId = Number(req.params.userId);
  const { username } = req.body;

  // Validate fields
  if (!userId || !username) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Update the user in the database
    const [rowsAffected] = await User.update(
      { username },
      {
        where: { id: userId },
        fields: ['username'],
        returning: true, // Return the updated user object
      },
    );

    // If no rows were affected, the user was not found
    if (!rowsAffected) {
      return res.sendStatus(404); // User not found
    }

    // Send the updated user object back to the client
    return res.status(200).json(rowsAffected); // Return updated user object
  } catch (error) {
    // Check if the error is due to a uniqueness constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Username is already taken' });
    }

    // Log the error on the server
    console.error('Error updating user:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.userId);

  // Validate Id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Delete the user from the database
    const rowsAffected = await User.destroy({ where: { id } });

    // If no rows were affected, the user was not found
    if (!rowsAffected) {
      return res.sendStatus(404); // User not found
    }

    // Send the number of affected rows back to the client
    return res.status(200).send(rowsAffected.toString());
  } catch (error) {
    // Log the error on the server
    console.error('Error deleting user:', error);
    return res.sendStatus(500); // Internal server error
  }
};
