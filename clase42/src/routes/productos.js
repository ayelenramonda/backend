import { Router } from 'express';
import {
	saveController,
	getAllController,
	getByIdC,
	deleteProductController
} from '../controller/productos';

const router = Router();

router.post('/', saveController);
router.get('/list', getAllController);
router.get('/:id', getByIdC);
router.delete('/:id', deleteProductController);

export default router;
