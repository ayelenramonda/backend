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
			const carritos = await this.listarAll();
			if (carritos.length === 0) {
				const carrito = { timestamp: moment().format('LLLL'), productos: { ProductosModel } };
				const newElement = new this.collection(carrito);
				const result = await newElement.save();
				return result;
			} else {
				const carrito = { timestamp: moment().format('LLLL'), productos: { ProductosModel } };
				const newElement = new this.collection(carrito);
				const result = await newElement.save();
				return result;
			}
		} catch (err) {
			return res.status(500).json({
				error: err.message,
				stack: err.stack
			});
		}
	}

	async listarProd(id) {
		const carrProd = await this.listar(id);
		return carrProd.productos;
	}

	///listar id  de carrito
	async listar(id) {
		try {
			const producto = await this.collection.findOne(id);
			const carrDto = asDtoCarr(carr);
			return carrDto;
		} catch (error) {
			return { error: 'No existen carritos' };
		}
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		const prod = await this.producto.getById(idProd);
		console.log(prod);
		return await this.collection.findByIdAndUpdate(
			{ _id: idCarrito },
			{ $push: { productos: prod } }
		);
	}

	// Borra un carrito en específico
	async borrar(id) {
		try {
			return await this.collection.findByIdAndDelete(id);
		} catch (err) {
			return { error: 'No se pudo eliminar el carrito' };
		}
	}

	// Borra un producto en específico de un carrito
	async borrarProd(idProd, idCarrito) {
		try {
			const prod = await this.producto.getById(idProd);
			return await this.collection.findByIdAndUpdate(idCarrito, { $pull: { productos: prod } });
		} catch (err) {
			return { error: 'No se pudo eliminar el producto' };
		}
	}
}
