import Router from 'koa-router';
import ProductosRouter from './productos.js';

const router = new Router({
	prefix: '/api'
});

router.use(ProductosRouter);

router.get('/', (ctx) => {
	console.log(ctx);
});

export default router.routes();
