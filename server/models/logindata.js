// import important parts of sequelize library
const { Model, Sequelize } = require("sequelize");
// import our database connection from config.js

module.exports = (sequelize, Sequelize) => {
    const Logindata = sequelize.define("logindata", {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        password_hash: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        password_salt: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        email_addr: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        last_login: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },

        confirmation_token: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        confirmation_token_time: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        recovery_token: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        hash_algoID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "hashalgo",
                key: "ID",
            },
        },

        email_validation_statusID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "emailvalidationstatus",
                key: "ID",
            },
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Logindata.associate = function(models) {
        Logindata.belongsTo(models.hashalgo)
        Logindata.belongsTo(models.emailvalidationstatus)
        Logindata.hasOne(models.Account, {
            foreignKey: 'accountID',
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    };
    return Logindata
}