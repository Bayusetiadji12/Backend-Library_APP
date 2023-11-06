'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Recipe, {
        foreignKey: "recipeId",
        as: "recipes",
      });

      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", 
      });
    }
  }
  Comment.init({
    komentar: {
      type: DataTypes.TEXT,
      allowNull: false, // tidak boleh null
      validate: {
        notNull: true
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false, // tidak boleh null
      validate: {
        min: 0,
        max: 5,
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false, // tidak boleh null
      references: {
        model: "Recipes",
        key: "id",
    }
    },
    userId: DataTypes.INTEGER,
  }, 
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};