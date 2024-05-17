export const getAllRecords = (model) => async (req, res) => {
  try {
    // Query database for all roles
    return res.status(200).send(await model.findAll());
  } catch (error) {
    // Logging error to server
    console.error('Error retrieving roles:', error);
    return res.status(500); // Internal server error
  }
};

export const getRecordById = (model) => async (req, res) => {
  const id = Number(req.params.id);

  // Validate id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Query database for role
    const record = await model.findByPk(id);

    if (!record) {
      return res.statusCode(404); // Not Found
    }

    // Send the record data to client
    return res.status(200).send(record);
  } catch (error) {
    // Logging error on server
    console.error('Error retrieving record:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export const createRecord = (model) => async (req, res) => {
  // Validate field
  if (!req.fields) {
    return res.sendStatus(400); // Bad Request
  }

  try {
    // Create a record on the DB.
    await model.create(req.fields, { userId: req.decoded.id });
    return res.sendStatus(201);
  } catch (error) {
    // Check if the error is due to a uniqueness constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Record already exist' });
    }
    // Logging error on server
    console.error('Error creating record:', error);
    return res.sendStatus(500);
  }
};

export const updateRecordById = (model) => async (req, res) => {
  const id = Number(req.params.id);

  // Validate fields
  if (!id || !req.fields) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Update the role in the database
    const [rowsAffected] = await model.update(
      req.fields,
      {
        where: { id },
        returning: true, // Return the updated role object
        userId: req.decoded.id,
      },
    );

    // If no rows were affected, record not found
    if (!rowsAffected) {
      return res.sendStatus(404); // Record not found
    }

    // Send the updated record object back to the client
    return res.status(200).json(rowsAffected); // Return updated role object
  } catch (error) {
    // Check if the error is due to a uniqueness constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Record already exist' });
    }

    // Log the error on the server
    console.error('Error updating record:', error);
    return res.sendStatus(500); // Internal server error
  }
};

export const deleteRecordById = (model) => async (req, res) => {
  const id = Number(req.params.id);

  // Validate Id parameter
  if (!id || id <= 0) {
    return res.sendStatus(400); // Bad request
  }

  try {
    // Delete the record from the database
    const rowsAffected = await model.destroy({ where: { id } });

    // If no rows were affected, the record was not found
    if (!rowsAffected) {
      return res.sendStatus(404); // Record not found
    }

    // Send the number of affected rows back to the client
    return res.status(200).send(rowsAffected.toString());
  } catch (error) {
    // Log the error on the server
    console.error('Error deleting role:', error);
    return res.sendStatus(500); // Internal server error
  }
};
