//User.js
const { DataTypes } = require('sequelize')
const User = require('./User')

const db = require('../db/conn.js')

const Produto = db.define('Produto', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.STRING,
        allowNull: false
    },

    codigo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        
    }


})

User.hasMany(Produto)
Produto.belongsTo(User)


module.exports = Produto