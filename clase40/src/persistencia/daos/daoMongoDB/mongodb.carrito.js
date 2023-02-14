import mongoose from 'mongoose';

export default class DaoMongoDBCart {
	constructor(collection, schema) {
		this.collection = mongoose.model(collection, schema);
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
	async listar(id) {
		try {
			return await this.collection.findById(id);
		} catch (error) {
			return { error: 'No existen carritos' };
		}
	}

	//Obtener un producto de un carrito
	async listarProd(id) {
		const carrProd = await this.listar(id);
		//console.log(carrProd.length);
		return carrProd.productos;
	}

	// Obtener todos los carritos
	async listarAll() {
		try {
			const carr = await this.collection.find({});
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
