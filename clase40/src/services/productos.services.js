import ProductosRepository from '../persistencia/repository/productos.repository.js';

const productosRepository = new ProductosRepository();

export async function newProduct(producto) {
	const prod = await productosRepository.createProduct(producto);
	return prod;
}

export async function getAllProducts() {
	const products = await productosRepository.getAll();
	console.log(products);
	return products;
}

export async function getById({ id }) {
	const products = await productosRepository.getById(id);
	return products;
}

export async function deleteOneProduct() {
	const products = await productosRepository.deleteProduct();
	return products;
}
