import DaoMongoDB from './daoMongoDB/mongodb.productos.js';
import DaoMongoDBCart from './daoMongoDB/mongodb.carrito.js';
import DaoMongoDBMessage from './daoMongoDB/mongodb.mensajes.js';

import { productosSchema } from './daoMongoDB/schema/schema.productos.js';
import { carritoSchema } from './daoMongoDB/schema/schema.carrito.js';
import { initDb } from './daoMongoDB/mongodb.productos.js';

let dao = null;
let daoCarrito = null;
let daoMsg = null;
let argv = process.argv[2];

switch (argv) {
	default:
		DaoMongoDB.init();
		dao = new DaoMongoDB();
		daoCarrito = new DaoMongoDBCart();
		daoMsg = new DaoMongoDBMessage();
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

export async function getByIdCarr(id) {
	try {
		return await daoCarrito.getByIdCarr(id);
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

///mensajes
export async function saveMsg(data) {
	return await daoMsg.saveMsg(data);
}

export async function getAllMsg() {
	return await daoMsg.getAllMsg();
}

export async function getByIdMsg(id) {
	return await daoMsg.getById(id);
}

export function getDaoMsg() {
	return daoMsg;
}
