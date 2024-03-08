const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Produto = require('../Model/Produto')
const ProdutoImagem = require('../Model/ProdutoImagem')
const Categoria = require('../Model/Categoria')
const Tamanho = require('../Model/Tamanho')
const Cor = require('../Model/Cor')
const getToken = require('../Helpers/get-token')
const User = require('../Model/User')
const getUserByToken = require('../Helpers/get-user-by-token')

//helpers
module.exports = class ProdutoController {

    //create Produto
    static async CreateProduto(req, res) {

        const { name, descricao, preco, tamanho, cor, marca, categoria, quantidade, codigo } = req.body


        const available = true

        //regras de negocio
        if (!name) {
            res.status(422).json({ message: 'O nome do produto é obrigatório' })
            return
        }
        if (!descricao) {
            res.status(422).json({ message: 'A descricao do produto é obrigatório' })
            return
        }
        if (!preco) {
            res.status(422).json({ message: 'O preco do produto é obrigatório' })
            return
        }
        if (!tamanho) {
            res.status(422).json({ message: 'O tamanho do produto é obrigatório' })
            return
        }
        if (!cor) {
            res.status(422).json({ message: 'A cor do produto é obrigatório' })
            return
        }
        if (!marca) {
            res.status(422).json({ message: 'A marca do produto é obrigatório' })
            return
        }
        if (!categoria) {
            res.status(422).json({ message: 'A categoria do produto é obrigatório' })
            return
        }
        if (!quantidade) {
            res.status(422).json({ message: 'A quantidade do produto é obrigatório' })
            return
        }

        //Checar se o produto existe
        // checando se o produto existe
        const ProdutoExists = await Produto.findOne({ where: { codigo: codigo } })

        if (ProdutoExists) {
            res.status(422).json({ message: 'Produto já cadastrado' })
            return
        }
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        const newProduto = new Produto({
            name: name,
            descricao: descricao,
            preco: preco,
            marca: marca,
            quantidade: quantidade,
            codigo: codigo,
            available: available,
            UserId: currentUser.id
        });


        try {
            //criar novo Produto no banco
            const produto = await newProduto.save();

            const newCor = new Cor({ Cor: cor, ProdutoId: produto.id });
            await newCor.save();

            const newTamanho = new Tamanho({ Tamanho: tamanho, ProdutoId: produto.id });
            await newTamanho.save();

            const newCategoria = new Categoria({ categoria: categoria, ProdutoId: produto.id });
            await newCategoria.save();

            const images = req.files;
            if (images && images.length > 0) {
                // Save each image to the ImagePet table
                for (let i = 0; i < images.length; i++) {
                    const filename = images[i].filename;
                    const newImageProduto = new ProdutoImagem({ image: filename, ProdutoId: produto.id });
                    await newImageProduto.save();
                }
            }

            res.status(200).json({ message: 'Produto cadastrado' })
            //Após criar o usuário, enviar para finalizar a criação com token
            // await createProdutoToken(newProduto, req, res)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    //mostrando todos
    static async getAllProduto(req, res) {
        try {
            const Produtos = await Produto.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: Tamanho }, { model: Categoria }, { model: ProdutoImagem }, { model: Cor }]
            });

            res.status(200).json({ Produtos });
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os produtos.' });
        }
    }

    //filtrando os usuario
    static async getAllUserProdutos(req, res) {
        //encontrando o usuario logado
        let currentProduto
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentProduto = await Produto.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        const Produtos = await Produto.findAll({
            where: { ProdutoId: currentProdutoId },
            order: [['createdAt', 'DESC']],
            include: [{ model: Tamanho }, { model: Categoria }, { model: ProdutoImagem }, { model: Cor }]
        })

        res.status(200).json({ Produtos })

    }

    static async getProdutoById(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' });
            return;
        }

        try {
            // Obtendo o produto pelo ID com todas as inclusões desejadas
            const produto = await Produto.findByPk(id, {
                include: [
                    { model: ProdutoImagem },
                    { model: Categoria },
                    { model: Tamanho },
                    { model: Cor }
                ]
            });

            // Validando se o produto existe
            if (!produto) {
                res.status(422).json({ message: 'Produto não existe' });
                return;
            }

            res.status(200).json({ produto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }



    static async removeProdutoById(req, res) {
        const id = req.params.id;
        console.log(id);
        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' });
            return;
        }
        //get by id
        const produto = await Produto.findByPk(id)

        //validando se o ID é valido
        if (!produto) {
            res.status(422).json({ message: 'Produto não existe' })
            return
        }
        //checar se o usuario logado registrou
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        await Produto.destroy({ where: { id: id } })

        res.status(200).json({ message: 'Produto removido com sucesso' })

        // try {
        //     await Produto.destroy({ where: { id: id } })
        //     res.status(200).json({ message: 'Produto removido com sucesso' })
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ message: 'Erro ao remover o produto' })
        // }

    }


    static async schedule(req, res) {
        const id = req.params.id;

        const produto = await Produto.findByPk(id);

        if (!produto) {
            res.status(404).json({ message: "Produto não existe!" });
            return;
        }

        //checar se o usuario logado registrou o 
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (produto.userId === currentUser.id) {
            res.status(422).json({ message: "O produto já é seu" });
            return;
        }

        //checar se o usuario ja agendou a visita

        if (produto.compra) {
            if (produto.compra === currentUser.id) {
                res.status(422).json({ message: "Voce ja agendou a visita" });
                return;
            }
        }

        console.log(produto.compra, ' = ', currentUser.id)
        //adicioar user como adontante do pet
        produto.compra = currentUser.id

        await pet.save()

        res.status(200).json({ message: `Visita agendada por ${currentUser.name}` })
    }


    static async updateProduto(req, res) {
        const id = req.params.id
        const { name, descricao, preco, tamanho, cor, marca, categoria, quantidade } = req.body

        const updateData = {}
        const Produto = await Produto.findByPk(id);

        if (!Produto) {
            res.status(404).json({ message: "Produto não existe!" });
            return;
        }

        //pegando o dono
        let currentProduto
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentProduto = await Produto.findByPk(decoded.id)

        if (Produto.UserId !== currentProduto.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        } else {
            updateData.name = name
        }
        if (!descricao) {
            res.status(422).json({ descricao: "A descricao é obrigatória!" });
            return;
        } else {
            updateData.descricao = descricao
        }
        if (!preco) {
            res.status(422).json({ message: "O preco é obrigatório!" });
            return;
        } else {
            updateData.preco = preco
        }
        if (!tamanho) {
            res.status(422).json({ message: "O tamanho é obrigatória!" });
            return;
        } else {
            updateData.tamanho = tamanho
        }
        if (!cor) {
            res.status(422).json({ message: "A cor é obrigatória!" });
            return;
        } else {
            updateData.cor = cor
        }
        if (!marca) {
            res.status(422).json({ message: "A marca é obrigatória!" });
            return;
        } else {
            updateData.marca = marca
        }
        if (!categoria) {
            res.status(422).json({ message: "A categoria é obrigatória!" });
            return;
        } else {
            updateData.categoria = categoria
        }
        if (!quantidade) {
            res.status(422).json({ message: "A quantidade é obrigatória!" });
            return;
        } else {
            updateData.quantidade = quantidade
        }
        if (!codigo) {
            res.status(422).json({ message: "O código é obrigatória!" });
            return;
        } else {
            updateData.codigo = codigo
        }

        const images = req.files
        if (!images || images.length === 0) {
            res.status(422).json({ message: "As imagens são obrigatórias!" });
            return;
        } else {
            // Atualizar as imagens
            const imageFilenames = images.map((image) => image.filename);
            // Remover imagens antigas
            await ImageProduto.destroy({ where: { ProdutoId: Produto.id } });
            // Adicionar novas imagens
            for (let i = 0; i < imageFilenames.length; i++) {
                const filename = imageFilenames[i];
                const newImageProduto = new ProdutoImagem({ image: filename, ProdutoId: Produto.id });
                await newImageProduto.save();
            }

        }

        await Produto.update(updateData, { where: { id: id } });

        res.status(200).json({ message: "att com successo!" })
    }
}