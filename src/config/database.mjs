import { Sequelize } from 'sequelize';
import User from '../models/user.mjs';
import Role from '../models/role.mjs';
import Permission from '../models/permission.mjs';

// Create the database connection
const sequelize = new Sequelize('dev_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const models = {
  User,
  Role,
  Permission,
};

// Initiate all models
Object.values(models)
  .filter((model) => typeof model.initiate === 'function')
  .forEach((model) => model.initiate(sequelize));

// Setup associations for all models
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

export default sequelize;
