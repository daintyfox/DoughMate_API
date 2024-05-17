// Validate the fields for users
const validateRoleName = (req, res, next) => {
  // Extract possible fields
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400); // Bad Request, all possible editable fields are null
  }

  // name validation
  const nameRegex = /^[a-zA-Z ]{3,60}$/;
  if (!nameRegex.test(name)) {
    return res.status(400).send('Name must have letters only and be beteen 3 and 60 characters long');
  }

  req.fields = { name };

  return next();
};

export default validateRoleName;
