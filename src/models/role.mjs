import { DataTypes } from 'sequelize';
import BaseModel from './baseModel.mjs';

class Role extends BaseModel {
  static initiate(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Role',
      },
    );
  }

  static associate(models) {
    super.associate();
    this.hasMany(models.User);
    this.belongsToMany(models.Permission, { through: 'RolePermission' });
  }
}

export default Role;
