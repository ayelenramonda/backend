const express = require('express')
const rutaPrincipal = require('../routes/index')
const path = require('path')
// const { ProdcutosController } = require('../controller/productos')
// const router = express.Router()

// let produtos = new Contenedor()



const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('views', viewsFolderPath)
app.set('view engine', 'ejs')




app.use('/api', rutaPrincipal)

// routes.get('/', async (req, res, next) => {
//     try {
//         let fileData = await ProdcutosController.getAll()
//         res.json(fileData)

//     } catch (err) {
//         next(err);
//     }
// });






app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});
module.exports = app