const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Store = sequelize.define('store', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    itemName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: Sequelize.STRING,
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Store;