import Router from 'express'
import UserRouter from './user.router.js'
import InfoRouter from './info.js'
import RandomRouter from './random.router.js'

const routes = Router()

routes.use('/user', UserRouter )
routes.use('/info', InfoRouter )
routes.use('/random', RandomRouter);

export default routes