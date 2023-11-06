'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.hasMany(models.Comment, {
        foreignKey: "recipeId",
        as: "comments",
      });
      Recipe.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", 
      });
    }
  }
  Recipe.init({
    resep: {
      type: DataTypes.STRING,
      allowNull: false, // tidak boleh null
      validate: {
        max: 255, // maksimal panjang string 255 karakter
        notNull: true
      },
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false, // tidak boleh null
      validate: {
        notNull: true
      },
    },
    bahan: {
      type: DataTypes.TEXT,
      allowNull: false, // tidak boleh null
      validate: {
        notNull: true
      },
    },
    pembuatan: {
      type: DataTypes.TEXT,
      allowNull: false, // tidak boleh null
      validate: {
        notNull: true
      },
    },
    userId: DataTypes.INTEGER,
  }, 
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};