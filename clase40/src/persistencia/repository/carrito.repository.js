import { asDtoCarr } from '../dto/carrito.dto.js';
import { getDaoCarr } from '../daos/factory.js';

export default class CarritoRepository {
	constructor() {
		this.dao = getDaoCarr();
	}

	async listarAll() {
		try {
			const carr = await this.dao.listarAll();
			//const dtoCarr = asDtoCarr(carr);
			return carr;
		} catch (err) {
			return { error: 'No existen carritos' };
		}
	}

	async crearCarrito(carr) {
		try {
			const newCarrito = await this.dao.crearCarrito(carr);
			console.log(newCarrito);
			return newCarrito;
		} catch (err) {
			return res.status(500).json({
				error: err.message,
				stack: err.stack
			});
		}
	}

	async listarProd(id) {
		const carrProd = await this.dao.listar(id);
		return carrProd.productos;
	}

	///listar id  de carrito
	async listar(id) {
		try {
			const carr = await this.dao.listar(id);
			//const carrDto = asDtoCarr(carr);
			return carr;
		} catch (error) {
			console.log(error);
			return { error: 'No existen carritos' };
		}
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		try {
			const prod = await this.dao.guardarProductoEnCarrito(idProd, idCarrito);
			console.log(prod);
			return prod;
		} catch (error) {
			console.log(error);
		}
	}

	// Borra un carrito en específico
	async borrar(id) {
		try {
			return await this.dao.borrar(id);
		} catch (err) {
			return { error: 'No se pudo eliminar el carrito' };
		}
	}

	// Borra un producto en específico de un carrito
	async borrarProd(idProd, idCarrito) {
		try {
			const prod = await this.dao.borrarProd(idProd, idCarrito);
			return prod;
		} catch (err) {
			return { error: 'No se pudo eliminar el producto' };
		}
	}
}
