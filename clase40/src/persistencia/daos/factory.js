import DaoMongoDB from './daoMongoDB/mongodb.productos.js';
import DaoMongoDBCart from './daoMongoDB/mongodb.carrito.js';
import { productosSchema } from './daoMongoDB/schema/schema.productos.js';
import { carritoSchema } from './daoMongoDB/schema/schema.carrito.js';
import { initDb } from './daoMongoDB/mongodb.productos.js';

let dao;
let daoCarrito;
let argv = process.argv[2];

switch (argv) {
	default:
		initDb();
		dao = new DaoMongoDB('productos', productosSchema);
		daoCarrito = new DaoMongoDBCart('carrito', carritoSchema);
		console.log(argv);
		break;
}

///productos
export async function createProduct(producto) {
	return await dao.createProduct(producto);
}

export async function getAll() {
	return await dao.getAll();
}

export async function getById() {
	return await dao.getById();
}

export async function deleteProduct() {
	return await dao.deleteProduct();
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

export async function listar() {
	return await daoCarrito.listar();
}

export async function borrar() {
	return await daoCarrito.borrar();
}

export async function borrarProd() {
	return await daoCarrito.borrarProd();
}

export function getDaoCarr() {
	return daoCarrito;
}
