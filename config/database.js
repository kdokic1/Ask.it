const { Sequelize, Model, DataTypes} = require('sequelize')

const devConfig = {
    connectionString: 'postgres://postgres:uquahlahying@localhost:5432/askdb'
};

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};



const sequelize = new Sequelize(process.env.NODE_ENV.trim() === "production" ?  proConfig.connectionString : devConfig.connectionString, {
    define: {
    timestamps: false
    }
});




module.exports = sequelize;