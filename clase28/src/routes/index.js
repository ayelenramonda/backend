import  Router from 'express'
import UserRouter from './user.router'
import InfoRouter from './info.router.js'
import RandomRouter from './random.router'

const routes = Router()

routes.use('/user', UserRouter )
routes.use('/info', InfoRouter )
routes.use('/random', RandomRouter);

export default routes

