const { Router } =  require('express')
const ProductosRouter = require('./productos')
const formularioRouter = require('./formulario')

const routes = Router()

routes.use('/productos', ProductosRouter )
routes.use('/formulario', formularioRouter);

// routes.get('/', (req, res) =>{
// 	res.json({
// 		msg: 'ok router'
// 	})

// })

module.exports = routes