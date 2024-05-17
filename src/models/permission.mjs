import { Model, DataTypes } from 'sequelize';

class Permission extends Model {
  static initiate(sequelize) {
    this.init(
      {
        name: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Permission',
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.Role, { through: 'RolePermission' });
  }
}

export default Permission;
