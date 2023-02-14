import { Router } from 'express';

import {
	crearcarritoController,
	listar,
	listarProd,
	listarAll,
	guardarProductoEncarr,
	BorrarCarritoController,
	borrarOneProducto,
	finalizarCompra
} from '../controller/carrito.js';

const routes = Router();

routes.post('/', crearcarritoController);
routes.delete('/:id', BorrarCarritoController);
routes.delete('/:id/productos/:idPrd', borrarOneProducto);
routes.get('/:id/productos', listarProd);
routes.get('/', listarAll);
routes.get('/id', listar);
routes.post('/:id/productos/:idPrd', guardarProductoEncarr);
routes.get('/compra/:id', finalizarCompra);

export default routes;
