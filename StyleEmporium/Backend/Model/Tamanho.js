const { DataTypes } = require('sequelize')
const Produto = require('./Produto')

const db = require('../db/conn.js')

const Tamanho = db.define('Tamanho', {
    Tamanho: {
        type: DataTypes.STRING, 
        allowNull: false
    },
})

Produto.hasMany (Tamanho)
Tamanho.belongsTo (Produto)
module.exports = Tamanho