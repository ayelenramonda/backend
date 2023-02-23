import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ProductosModel } from './schema/schema.productos.js';

dotenv.config();

export default class DaoMongoDB {
	static init() {
		mongoose.connect(process.env.MONGO_ATLAS, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Conectado a MongoDB!');
			}
		});
	}

	async getAll() {
		try {
			const productos = await ProductosModel.find({});
			return productos;
		} catch (err) {
			res.status(500).json({
				error: err.message
			});
		}
	}

	async getById(id) {
		try {
			const producto = await ProductosModel.findById(id);
			return producto;
		} catch (error) {
			return { error: 'Producto no existe mongoDB' };
		}
	}

	async createProduct(producto) {
		try {
			const newProduct = new ProductosModel(producto);
			return await newProduct.save();
		} catch (err) {
			return { error: 'No se pudo ingresar el producto' };
		}
	}

	async updateProducto(id, updateProduct) {
		try {
			return await ProductosModel.updateOne(id, updateProduct);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProduct(id) {
		try {
			let product = await ProductosModel.deleteOne({ id });
			return product;
		} catch (error) {
			console.log(error);
		}
	}
}
