import  Router from 'express'
import ProductosRouter from './productos.js'
import CarritoRouter from './carrito'
import UserRouter from './user' 





const routes = Router()
routes.use('/productos', ProductosRouter )
routes.use('/carrito', CarritoRouter )
routes.use('/user', UserRouter)





export default routes