import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CarritoModel } from './schema/schema.carrito.js';

dotenv.config();

export default class DaoMongoDBCart {
	static init() {
		mongoose.connect(process.env.MONGO_ATLAS, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Conectado a MongoDB!');
			}
		});
	}

	async crearCarrito(carr) {
		try {
			const carritos = await this.listarAll();
			if (carritos.length === 0) {
				const carrito = { timestamp: moment().format('LLLL'), productos: { ProductosModel } };
				const newElement = new CarritoModel(carrito);
				const result = await newElement.save();
				return result;
			} else {
				const carrito = { timestamp: moment().format('LLLL'), productos: { ProductosModel } };
				const newElement = new CarritoModel(carrito);
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
	async listar(id) {
		try {
			let carr = await CarritoModel.findById(id);
			console.log(carr);
			return carr;
		} catch (error) {
			console.log(error);
			return { error: 'No existen carritos' };
		}
	}

	//Obtener un producto de un carrito
	async listarProd(id) {
		const carrProd = await listar(id);
		//console.log(carrProd.length);
		return carrProd.productos;
	}

	// Obtener todos los carritos
	async listarAll() {
		try {
			const carr = await CarritoModel.find({});
			return carr;
		} catch (err) {
			return { error: 'No existen carritos' };
		}
	}

	// Agrega un producto específico en un carrito específico

	// 	async guardarProductoEnCarrito(idProd, idCarrito) {
	// 		const prod = await this.producto.getById(idProd);
	// 		return await this.collection.findByIdAndUpdate({ _id: idCarrito }, { $push: { productos: prod } });
	// }
	async guardarProductoEnCarrito(idProd, idCarrito) {
		const prod = await this.producto.getById(idProd);
		console.log(prod);
		return await CarritoModel.findByIdAndUpdate({ _id: idCarrito }, { $push: { productos: prod } });
	}

	// Borra un carrito en específico
	async borrar(id) {
		try {
			return await CarritoModel.findByIdAndDelete(id);
		} catch (err) {
			return { error: 'No se pudo eliminar el carrito' };
		}
	}

	// Borra un producto en específico de un carrito
	async borrarProd(idProd, idCarrito) {
		try {
			const prod = await CarritoModel.getById(idProd);
			return await CarritoModel.findByIdAndUpdate(idCarrito, { $pull: { productos: prod } });
		} catch (err) {
			return { error: 'No se pudo eliminar el producto' };
		}
	}
}
