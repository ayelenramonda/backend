import  Router from 'express'
import ProductosRouter from './productos'
import CarritoRouter from './carrito'
import ProductosRouterTest from './productosTest'
import MensajesRouter from './mensajes'
import UserRouter from './user'




const routes = Router()
routes.use('/productos', ProductosRouter )
routes.use('/carrito', CarritoRouter )
routes.use('/productos-test', ProductosRouterTest )
routes.use('/mensajes', MensajesRouter)
routes.use('/user', UserRouter)



export default routes