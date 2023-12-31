//const router = require("express").Router();
//const { User } = require("../../models");
const { INTEGER } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    streamChatUserId: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    googleID: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        
        
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        
            
        
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: function(value) {
          if (!this.is_google_user && !value) {
            throw new Error("Password is required");
          }
        }
      }
    },
    admin: { 
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

    is_google_user: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

}, {
    freezeTableName: true
});
    User.associate = function(models) {
        User.hasMany(models.client, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        })
    };

    User.beforeCreate(async (user) => {
      if (!user.is_google_user && !user.password) {
        throw new Error("Password is required");
      }
    });

    return User;
};

/*
// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js
const sequelize = require("");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // set up beforeCreate lifecycle for "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;


  */