import { Router } from 'express';
import Carrito from '../controller/carrito'

const routes = Router()

const carrito = new Carrito();

routes.post("/", async (req, res) => {
	const carritoCreado = await carrito.addCarrito();
	res.send(carritoCreado);
});

routes.delete("/:id", async (req, res) => {
	const carritoBorrado = await carrito.borrar(req.params.id);
	res.send(carritoBorrado);
});

routes.delete("/:id/productos/:idPrd", async (req, res) => {
	const productoBorrado = await carrito.borrarProd(
		req.params.idPrd,
		req.params.id
	);
	res.send(productoBorrado);
})

routes.get("/:id/productos", async (req, res) => {
	const carroBuscado = Number(req.params.id);
	const cont = await carrito.listarProd(carroBuscado);
	res.send(cont);
	console.log(cont)
});


routes.post("/:id/productos/:idPrd", async (req, res) => {
	const respuesta = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(respuesta);
});





export default routes