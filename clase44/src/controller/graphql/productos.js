import {
	newProduct,
	getAllProducts,
	getById,
	deleteOneProduct
} from '../../services/rest/productos.services.js';

export const saveController = async ({ data }) => {
	const prodObj = { ...data };
	const product = await newProduct(prodObj);
	return product;
};

export const getAll = async () => {
	const products = await getAllProducts();
	console.log(products);
	return products;
};

export const getByIdC = async (args) => {
	const { id } = args;
	let product = await getById(id);
	return product;
};

export async function deleteProductController(args) {
	const { id } = args;
	let producto = await deleteOneProduct(id);
	return true;
}
