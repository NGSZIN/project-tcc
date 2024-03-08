const { DataTypes } = require('sequelize')
const Produto = require('./Produto')

const db = require('../db/conn.js')

const Categoria = db.define('Categoria', {
    categoria: {
        type: DataTypes.STRING, 
        allowNull: false
    },
})

Produto.hasMany(Categoria)
Categoria.belongsTo(Produto)

module.exports = Categoria