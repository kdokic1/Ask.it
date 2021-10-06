const { Sequelize, Model, DataTypes} = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:uquahlahying@localhost:5432/askdb', {define: {
    timestamps: false
}});

module.exports = sequelize;