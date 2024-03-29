import ProductosRepository from '../persistencia/repository/productos.repository.js';

const productosRepository = new ProductosRepository();

export async function newProduct(producto) {
	const prod = await productosRepository.createProduct(producto);
	return prod;
}

export async function getAllProducts() {
	const products = await productosRepository.getAll();
	return products;
}

export const getById = async (id) => {
	const getNew = await productosRepository.getById(id);
	return getNew;
};

export async function deleteOneProduct(id) {
	const products = await productosRepository.deleteProduct(id);
	return products;
}

export const updateProducto = async (id, updateProduct) => {
	const updateproducto = await newsRepository.updateNew(id, updateProduct);
	return updateproducto;
};
