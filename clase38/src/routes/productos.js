import { Router } from "express";
import { saveController, getAllController, getByIdProductController, DeleteProductController } from '../controller/productos';

const router = Router();

router.post('/add', saveController);
router.get('/list', getAllController);
router.get('/:id', getByIdProductController);
router.delete('/:id', DeleteProductController )

export default router;