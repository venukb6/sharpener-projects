const Sequelize = require('sequelize');

const sequelize = new Sequelize('general-store', 'root', 'root', {
    dialect: 'mysql', 
    host: 'localhost'
})

module.exports = sequelize;