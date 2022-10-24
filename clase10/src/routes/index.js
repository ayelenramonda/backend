const { Router } =  require('express')
const ProductosRouter = require('./productos')



const routes = Router()

routes.use('/productos', ProductosRouter )



module.exports = routes