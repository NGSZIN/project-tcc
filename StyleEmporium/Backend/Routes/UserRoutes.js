// Importa o módulo 'express' e cria um objeto Router
const router = require('express').Router()

// Importa o controlador de usuários
const UserController = require('../Controller/UserController')

// Importa middlewares
const verifyToken = require('../Helpers/verify-token') // Middleware para verificar o token de autenticação
const { imageUpload } = require('../Helpers/image-upload') // Middleware para upload de imagens

// Define rotas e associa funções do controlador a cada rota

// Rota para registrar um novo usuário
router.post('/register', UserController.register)

// Rota para realizar o login de um usuário
router.post('/login', UserController.login)

// Rota para verificar informações do usuário logado, requer autenticação
router.get('/checkuser', UserController.checkUser)

// Rota para obter informações de um usuário por ID
router.get('/:id', UserController.getUserById)

// Rota para editar informações de um usuário por ID, requer autenticação e suporta upload de imagem
router.patch(
    '/edit/:id',
    verifyToken,
    imageUpload.single("image"),
    UserController.editUser,
)

// Exporta o objeto Router configurado com as rotas
module.exports = router
