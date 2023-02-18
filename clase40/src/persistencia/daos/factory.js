import DaoMongoDB from './daoMongoDB/mongodb.productos.js';
import DaoMongoDBCart from './daoMongoDB/mongodb.carrito.js';
import { productosSchema } from './daoMongoDB/schema/schema.productos.js';
import { carritoSchema } from './daoMongoDB/schema/schema.carrito.js';
import { initDb } from './daoMongoDB/mongodb.productos.js';

let dao = null;
let daoCarrito = null;
let argv = process.argv[2];

switch (argv) {
	default:
		DaoMongoDB.init();
		dao = new DaoMongoDB();
		daoCarrito = new DaoMongoDBCart();
		// initDb();
		// dao = new DaoMongoDB('productos', productosSchema);
		// daoCarrito = new DaoMongoDBCart('carrito', carritoSchema);
		// console.log(argv);
		break;
}

///productos
export async function createProduct(producto) {
	return await dao.createProduct(producto);
}

export async function getAll() {
	return await dao.getAll();
}

export async function getById(id) {
	return await dao.getById(id);
}

export async function deleteProduct(id) {
	return await dao.deleteProduct(id);
}

export function getDao() {
	return dao;
}

///carrito

export async function crearCarrito(carr) {
	return await daoCarrito.crearCarrito(carr);
}

export async function guardarProductoEnCarrito(idProd, idCarrito) {
	return await daoCarrito.guardarProductoEnCarrito(idProd, idCarrito);
}

export async function listarAll() {
	return await daoCarrito.listarAll();
}

export async function getByIdCarr({ id }) {
	try {
		let carrito = await daoCarrito.getByIdCarr(id);
		console.log(carrito);
		return carrito;
	} catch (error) {
		console.log(error);
	}
}

export async function borrar(id) {
	return await daoCarrito.borrar(id);
}

export async function borrarProd(idProd, idCarrito) {
	return await daoCarrito.borrarProd(idProd, idCarrito);
}

export function getDaoCarr() {
	return daoCarrito;
}
