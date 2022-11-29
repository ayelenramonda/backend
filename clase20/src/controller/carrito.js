import { CarritoModel } from '../models/carrito'
import { ProductosModel } from '../models/productos';
import Producto from '../controller/productos'
import moment from 'moment';



 export default class Carrito{
	constructor() {
				this.producto = new Producto();				
			
		    }		

			
	async crearCarrito(carr) {
		try {
			const carritos = await this.listarAll();
			if(carritos.length === 0){
				const carrito = { timestamp: (moment().format('LLLL')), productos: [] };
				const newElement = new CarritoModel(carrito);
				const result = await newElement.save();
				return result;
			} else{
				const carrito = { timestamp: (moment().format('LLLL')), productos: [] };
				const newElement = new CarritoModel(carrito);
				const result = await newElement.save();
				return result;
			}
		   }  catch (err) {
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
	}
			async listar(id) {
				try{
					return await CarritoModel.findById(id)
			
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
		
		