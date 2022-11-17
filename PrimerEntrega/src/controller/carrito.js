import fs from 'fs';
import path from 'path';
import Producto from '../controller/productos';
const filePath = path.resolve(__dirname, "./carrito.json");
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';



 export default class Carrito{
	constructor() {
				this.producto = new Producto();
				this.carritos = [];
				
				
		
		    }
		
			async crearCarrito(carrito) {
				await fs.promises.writeFile(filePath, JSON.stringify(carrito, null, 2), "utf-8");
				return carrito;
			}
		
			// Obtener carrito por ID
			async listar(id) {
				try{
					const contenido = await this.listarAll();
					let carrito = contenido.find((carr) => carr.id === id);
					return carrito;
			
			
				}catch(error){
					return {error: "No existen carritos"}
				}
			}
		
			//Obtener un producto de un carrito
			async listarProd(id){
					 const carrProd = await this.listar(id);
					 //console.log(carrProd.length);
					 return carrProd.productos;
						
			}
		
			// Obtener todos los carritos
			async listarAll() {
				try {
					const contenido = await fs.promises.readFile(filePath, "utf-8");
					return JSON.parse(contenido)
				} catch (err) {
					return {error: "No existen carritos"}
				}
			}
			
		
		
			// Agregar un carrito y crea el archivo si es que no existe
			async addCarrito() {
				try {
					const contenido = await this.listarAll();
					const carr = { id: uuidv4(), timeStamp: (moment().format('LLLL')), productos: [] };
					contenido.push(carr);
					this.crearCarrito(contenido);
					console.log(`carrito agregado`);
					return carr;	
		
				} catch (err) {
					await this.crearCarrito([]);
					const contenido = await this.listarAll();
					const carr = { id: uuidv4(), timeStamp: (moment().format('LLLL')), productos: [] };
					contenido.push(carr)
					await this.crearCarrito(contenido);
					return carr;
				}
			}
		
			async actualizar(carr, id) {
				const contenido = await this.listarAll();
				let index = contenido.findIndex((p) => p.id == id);
				carr.timeStamp = moment().format('LLLL')
				if (index >= 0) {
					contenido.splice(index, 1, { ...carr, id });
					this.crearCarrito(contenido);
					return {msj: "Producto agregado"};
				} else {
					return {error: `Producto con id: ${carr.id} no existe`};
				}
			}
			// Agrega un producto específico en un carrito específico
			
			async guardarProductoEnCarrito(idProd, idCarrito) {
				const prod = await this.producto.getById(idProd);
				const carr = await this.listar(idCarrito);
				console.log(carr.productos);
				carr.productos.push(prod);
	
				this.actualizar(carr, idCarrito);
	
				return {msj: "Producto agregado al carrito"};
		}
		
		
			// Borra un carrito en específico
			async borrar(id) {
				const contenido = await this.listarAll();
				let index = contenido.findIndex((carr) => carr.id == id);
				contenido.splice(index, 1);
				console.log(contenido);
				this.crearCarrito(contenido);
		
				return {msj: `{ Carrito con id: ${id} eliminado }`};
			}
		
			// Borra un producto en específico de un carrito
			async borrarProd(idProd, idCarrito){
		
				const carrito = await this.listar(idCarrito);
				console.log(carrito.productos);
				if(carrito.productos.length){
					for ( var i = 0; i < carrito.productos.length ; i++){
						let obj = carrito.productos[i];
						if ( obj.id == idProd){
							let indexProducto = carrito.productos.findIndex((prod) => prod.id == idProd);
							carrito.productos.splice(indexProducto, 1);
						}
					}
					this.actualizar(carrito, idCarrito);
		
				return {msj: `Producto con id: ${idProd} eliminado del carrito con id: ${idCarrito}`}
		
				}else{
					return {msj: "Producto no encontrado"}
				}
		
			
			}
		}
		