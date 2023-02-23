import { asDto } from '../dto/productos.dto.js';
import { getDao } from '../daos/factory.js';

export default class ProductosRepository {
	constructor() {
		this.dao = getDao();
	}

	async getAll() {
		try {
			const productos = await this.dao.getAll();
			const dtoProducto = asDto(productos);

			return dtoProducto;
		} catch (err) {
			res.status(500).json({
				error: err.message
			});
		}
	}

	async createProduct(producto) {
		try {
			const newProduct = await this.dao.createProduct(producto);
			return newProduct;
		} catch (err) {
			return { error: 'No se pudo ingresar el producto' };
		}
	}

	async getById(id) {
		try {
			const producto = await this.dao.getById(id);
			return producto;
		} catch (error) {
			console.log(error);
			return { error: 'Producto no existe repository' };
		}
	}

	async updateProducto(id, updateProduct) {
		const updateProducto = await this.dao.updateNew(id, updateProduct);
		return updateProducto;
	}

	async deleteProduct(id) {
		let product = await this.dao.deleteProduct(id);
		return product;
	}
	catch(err) {
		console.log(err);
	}
}
