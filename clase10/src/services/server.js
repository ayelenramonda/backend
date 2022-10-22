const express = require('express')
const rutaPrincipal = require('../routes/index')
const path = require('path')
const { ProdcutosController } = require('../controller/productos')


const app = express();

app.get('/', (req, res) => {
    const productos = ProdcutosController.getAll();
    res.render('index', { productos });
  });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('views', viewsFolderPath)
app.set('view engine', 'ejs')




app.use('/api', rutaPrincipal)







app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});
module.exports = app