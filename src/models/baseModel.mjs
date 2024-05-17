// BaseModel.js
import { Model, DataTypes } from 'sequelize';
import User from './user.mjs';

class BaseModel extends Model {
  static initiate(sequelize) {
    return super.init(
      {
        // Common fields for all models
        createdBy: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
            key: 'id',
          },
        },
        updatedBy: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        hooks: {
          beforeCreate: (model, options) => {
            const newModel = { ...model };
            // Set createdBy and updatedBy fields for newly created records
            newModel.createdBy = options.userId;
            newModel.updatedBy = options.userId;
            return newModel;
          },
          beforeUpdate: (model, options) => {
            const newModel = { ...model };
            // Set updatedBy field for updated records
            newModel.updatedBy = options.userId;
            return newModel;
          },
        },
      },
    );
  }

  static associate() {
    this.belongsTo(User, { foreignKey: 'createdBy', onDelete: 'SET NULL' });
    this.belongsTo(User, { foreignKey: 'updatedBy', onDelete: 'SET NULL' });
  }
}

export default BaseModel;
