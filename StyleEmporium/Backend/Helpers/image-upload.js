const multer = require('multer')
const path = require("path")
//Aqui define onde os arquivos serão enviados
//Destino das imagens no storage
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        let folder = ""

        if (req.baseUrl.includes("users")) {
            folder = "users"
        } else if (req.baseUrl.includes("Produtos")) {
            folder = "Produtos"
        }

        cb(null, `public/images/${folder}`)

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})




const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) { // Correção de "fillFilter" para "fileFilter"
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas jpg ou png")) // Correção de "cd" para "cb"
        }
        cb(null, true) // Correção de "cd" para "cb"
    }
})

module.exports = { imageUpload }


