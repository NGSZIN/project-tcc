// Importa o módulo 'express' e cria um objeto Router
const router = require('express').Router()

// Importa o controlador de produtos
const ProdutoController = require ('../Controller/ProdutoController')

// Importa middlewares
const verifyToken = require('../Helpers/verify-token') // Middleware para verificar o token de autenticação
const { imageUpload } = require('../Helpers/image-upload') // Middleware para upload de imagens

// Define rotas e associa funções do controlador a cada rota

// Rota para criar um produto, requer autenticação e suporta upload de imagens
router.post('/create', verifyToken, imageUpload.array('image'), ProdutoController.CreateProduto)

// Rota para obter todos os produtos
router.get('/getall', ProdutoController.getAllProduto)

// Rota para obter todos os produtos de um usuário específico
router.get('/getalluser', ProdutoController.getAllUserProdutos)

// Rota para obter um produto por ID
// router.get('/getproduto/:id', ProdutoController.getProdutoById)

// Rota para remover um produto por ID, requer autenticação
router.delete('/:id', verifyToken, ProdutoController.removeProdutoById)

// Rota para obter um produto por ID
 router.get('/:id', ProdutoController.getProdutoById)

// Rota para editar um produto por ID, requer autenticação e suporta upload de imagem
router.patch(
    '/edit/:id',
    verifyToken,
    imageUpload.single("ProdutoImagem"),
    ProdutoController.updateProduto,
)

// Exporta o objeto Router configurado com as rotas
module.exports = router
