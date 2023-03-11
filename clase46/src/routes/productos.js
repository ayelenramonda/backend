import Router from 'koa-router';
import { getAll, save, getById, updateProduct, removeProduct } from '../controllers/productos.js';

const router = new Router({
	prefix: '/productos'
});

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', save);

router.put('/:id', updateProduct);

router.delete('/:id', removeProduct);

export default router.routes();
