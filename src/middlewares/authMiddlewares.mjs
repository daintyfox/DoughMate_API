import jwt from 'jsonwebtoken';

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  // Get token from request headers
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Check if the Authorization header starts with 'Bearer '
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }
  const token = authHeader.substring(7); // Removes the Bearer tag

  // Veify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] });
    // console.log('Decoded token:', decoded); // Log decoded token payload
    req.decoded = decoded;
    return next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
};

// Middleware for checking permissions
const checkPermissions = (requiredPermission) => (req, res, next) => {
  const { permissions } = req.decoded;

  if (!permissions) {
    return res.sendStatus(403);
  }

  // Check if user has the required permission
  if (!permissions.includes(requiredPermission)) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }

  // User has required permission, proceed to the next middleware/route handler
  return next();
};

export { verifyToken, checkPermissions };
