import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static initiate(sequelize) {
    this.init(
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 10));
          },
        },
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
        modelName: 'User',
        hooks: {
          beforeCreate: (user, options) => {
            const newUser = { ...user };
            // Set createdBy and updatedBy fields for newly created records
            newUser.createdBy = options.userId;
            newUser.updatedBy = options.userId;

            return newUser;
          },
          beforeUpdate: (user, options) => {
            const newUser = { ...user };
            // Set updatedBy field for updated records
            newUser.updatedBy = options.userId;
            return newUser;
          },
        },
      },
    );
  }

  static associate(models) {
    this.belongsTo(User, { foreignKey: 'createdBy', onDelete: 'SET NULL' });
    this.belongsTo(User, { foreignKey: 'updatedBy', onDelete: 'SET NULL' });
    this.belongsTo(models.Role);
  }
}

export default User;
