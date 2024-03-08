//Cor.js
const { DataTypes } = require('sequelize')
const Produto = require('./Produto')

const db = require('../db/conn.js')

const Cor = db.define('Cor', {
    Cor:{
        type: DataTypes.STRING,
        allowNull: false,
    }

})

Cor.belongsTo(Produto)
Produto.hasMany(Cor)


module.exports = Cor