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
			console.log(dtoProducto + 'repository');
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
			console.log(newProduct);
			return newProduct;
		} catch (err) {
			return { error: 'No se pudo ingresar el producto' };
		}
	}

	async getById(id) {
		try {
			const producto = await this.dao.getdById(id);
			return producto;
		} catch (error) {
			return { error: 'Producto no existe' };
		}
	}

	async findByIdAndUpdate(id, updateProduct) {
		try {
			return await this.dao.findByIdAndUpdate(id, updateProduct);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProduct(id) {
		let product = await this.dao.findOne(id);
		return await this.dao.findByIdAndDelete(product._id);
	}
	catch(err) {
		console.log(err);
	}
}
