// Importa o módulo 'express' para criar uma instância do aplicativo
const express = require('express');
// Importa o módulo 'cors' para lidar com a política de mesma origem (Cross-Origin Resource Sharing)
const cors = require('cors');

// Cria uma instância do aplicativo Express
const app = express();

// Importa a conexão com o banco de dados (assumindo que este arquivo exporta uma instância do Sequelize)
const conn = require('./db/conn');

// Configura o middleware para analisar o corpo das solicitações como JSON
app.use(express.json());

// Configura o middleware CORS para lidar com políticas de mesma origem
app.use(cors({ credentials: true, origin: '*' }));

// Configura o middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Importa e utiliza as rotas para usuários e produtos
const UserRoutes = require('./Routes/UserRoutes');
const ProdutoRoutes = require('./Routes/ProdutoRoutes');
app.use('/users', UserRoutes);
app.use('/produtos', ProdutoRoutes);

// Sincroniza a conexão com o banco de dados e inicia o servidor na porta 5000
conn
    .sync()
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => console.log(err));
