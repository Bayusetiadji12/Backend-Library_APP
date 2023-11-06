'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments"
      });
      User.hasMany(models.Recipe, {
        foreignKey: "userId",
        as: "recipes"
      });
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email tidak valid",
        },
      },
    },
    password:{
      type: DataTypes.TEXT,
      min: {
        args: 8,
        msg: "Password minimal 8 karakter",
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, 
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return User;
};