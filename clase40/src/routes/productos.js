import { Router } from 'express';
import {
	saveController,
	getAllController,
	getByIdC,
	DeleteProductController
} from '../controller/productos';

const router = Router();

router.post('/add', saveController);
router.get('/list', getAllController);
router.get('/:id', getByIdC);
router.delete('/:id', DeleteProductController);

export default router;
