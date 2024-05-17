// Validate the fields for users
const validateUserCreate = (req, res, next) => {
  // Extract possible fields
  const { username, password } = req.body;

  if (!username || !password) {
    return res.sendStatus(400); // Bad Request, all possible editable fields are null
  }

  // Username validation
  const usernameRegex = /^[a-z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).send('Username must be between 3 and 20 characters long and contain only lowercase letters, numbers, or underscores');
  }

  // Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).send('Password must be between 8 and 30 characters long and contain at least one lowercase letter, one digit, and one special character');
  }

  req.fields = { username, password };

  return next();
};

const validateUserUpdate = (req, res, next) => {
  req.fields = {};

  // Extract possible fields
  const { username, password } = req.body;

  if (!username && !password) {
    return res.sendStatus(400); // Bad Request, all possible editable fields are null
  }

  // Username validation
  if (username) {
    const usernameRegex = /^[a-z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).send('Username must be between 3 and 20 characters long and contain only lowercase letters, numbers, or underscores');
    }
    req.fields.username = username;
  }

  // Password validation
  if (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send('Password must be between 8 and 30 characters long and contain at least one lowercase letter, one digit, and one special character');
    }
    req.fields.password = password;
  }

  return next();
};

export { validateUserUpdate, validateUserCreate };
