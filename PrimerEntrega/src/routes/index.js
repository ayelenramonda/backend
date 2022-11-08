import  Router from 'express'
import ProductosRouter from './productos'
import CarritoRouter from './carrito'



const routes = Router()
routes.use('/productos', ProductosRouter )
routes.use('/carrito', CarritoRouter )

export default routes