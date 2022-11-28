import { CarritoModel } from '../models/carrito'
import { ProductosModel } from '../models/productos';

 export default class Carrito{
	constructor() {
				this.producto = new ProductosModel();				
			
		    }		

			
	async crearCarrito(carr) {
		try {
			const newCart = new CarritoModel(carr);
			return await newCart.save();

		} catch (err) {
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
	}
			async listar(id) {
				try{
					const contenido = await CarritoModel.find(id);					
					return contenido;
			
			
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
					const carr = await CarritoModel.find({});
					return (carr)
				
				} catch (err) {
					return {error: "No existen carritos"}
				}
			}
			
		
		
			
			// Agrega un producto específico en un carrito específico
			
			async guardarProductoEnCarrito(idProd, idCarrito) {
				const prod = await this.producto.getById(idProd);
				return await CarritoModel.findByIdAndUpdate({ _id: idCarrito }, { $push: { productos: prod } });
		}
		
		
			// Borra un carrito en específico
			async borrar(id) {
				try {
					
					return await CarritoModel.findByIdAndDelete(id);
				} catch (err) {
					return { error: "No se pudo eliminar el carrito" }
				}
			}
		
			// Borra un producto en específico de un carrito
			async borrarProd(idProd, idCarrito){
		
				try {
					const prod = await this.producto.getById(idProd);
					return await CarritoModel.findByIdAndUpdate(idCarrito, { $pull: { productos: prod } });
				} catch (err) {
					return { error: "No se pudo eliminar el producto" }
				}
		
			}
	}
		
		