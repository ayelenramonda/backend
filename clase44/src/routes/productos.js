import { Router } from 'express';
import {
	saveController,
	getAllController,
	getByIdC,
	deleteProductController,
	updateProductoController
} from '../controller/rest/productos.js';

const router = Router();

router.post('/', saveController);
router.get('/list', getAllController);
router.get('/:id', getByIdC);
router.delete('/:id', deleteProductController);
router.put('/:id', updateProductoController);

export default router;
