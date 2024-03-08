//User.js
const { DataTypes } = require('sequelize')
const Produto = require('./Produto')

const db = require('../db/conn.js')

const ProdutoImagem = db.define('ProdutoImagem', {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


Produto.hasMany(ProdutoImagem)
ProdutoImagem.belongsTo(Produto)


module.exports = ProdutoImagem