import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import Role from '../models/role.mjs';
import Permission from '../models/permission.mjs';

// Logins a user and sends a token.
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Validate fields
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find the user in the database
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username', 'password'],
      include: [{
        model: Role,
        include: [{
          model: Permission,
          attributes: ['name'],
        }],
      }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (user.Role && user.Role.Permissions) {
      user.permissions = user.Role.Permissions.map((permission) => permission.name);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        permissions: user.permissions,
      },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '30m', algorithm: 'RS256' },
    );

    // Send response with token
    return res.status(200).json({ user: { id: user.id, username: user.username }, token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Logouts a user and deletes the token from the DB.
export const logout = async (_req, res) => {
  console.log('Attempted to login');
  return res.sendStatus(501); // Logout still not implemented
};
