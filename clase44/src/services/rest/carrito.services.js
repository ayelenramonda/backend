import CarritoRepository from '../../persistencia/repository/carrito.repository.js';

const carritoRepository = new CarritoRepository();

export async function newCarrito(carrito) {
	const carr = await carritoRepository.crearCarrito(carrito);
	return carr;
}

export async function listarAllCarritos() {
	const carrito = await carritoRepository.listarAll();
	return carrito;
}

export async function getByIdCarr({ id }) {
	try {
		const getNew = await carritoRepository.getByIdCarr(id);
		return getNew;
	} catch (error) {
		console.log(error);
	}
}

export async function listarProducto() {
	const prod = await carritoRepository.listarProd();
	return prod;
}

export async function guardarOneProduct(idProd, idCarrito) {
	const carrito = await carritoRepository.guardarProductoEnCarrito(idProd, idCarrito);
	return carrito;
}

export async function borrar() {
	const carrito = await carritoRepository.borrar();
	return carrito;
}

export async function borrarProd(idProd, idCarrito) {
	const carrito = await carritoRepository.borrarProd(idProd, idCarrito);
	return carrito;
}
