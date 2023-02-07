import { CarritoModel } from '../models/carrito'
import { ProductosModel } from '../models/productos';
import Producto from '../controller/productos'
import moment from 'moment';
import { actualUser } from "../services/auth.js";
import { createTransport } from "nodemailer";
import { sendSms, sendWhastapp } from '../sms/sms.service.js'
import dotenv from "dotenv";
dotenv.config();


let username;
let name;



 export default class Carrito{
	constructor() {
				//this.producto = new Producto();				
			
		    }		

			
	async crearCarrito(carr) {
		try {
			const carritos = await this.listarAll();
			if(carritos.length === 0){
				const carrito = { timestamp: (moment().format('LLLL')), productos: { ProductosModel } };
				const newElement = new CarritoModel(carrito);
				const result = await newElement.save();
				return result;
			} else{
				const carrito = { timestamp: (moment().format('LLLL')), productos: { ProductosModel } };
				const newElement = new CarritoModel(carrito);
				const result = await newElement.save();
				return result;
			}
		   }  catch (err) {
			
			return res.status(500).json({
				error: err.message,
				stack: err.stack,
			  });
			
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
			
		// 	async guardarProductoEnCarrito(idProd, idCarrito) {
		// 		const prod = await this.producto.getById(idProd);
		// 		return await CarritoModel.findByIdAndUpdate({ _id: idCarrito }, { $push: { productos: prod } });
		// }
		async guardarProductoEnCarrito(idProd, idCarrito) { 
			const prod = await this.producto.getById(idProd); 			
			console.log(prod)			
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

	export const finalizarCompra = async (req, res) => {
		username = actualUser.username;
		name = actualUser.name;
		try {
		  
	  
		  const carritoId = req.params.id	  
		  let carrito = await CarritoModel.findById(carritoId);
		  console.log(carrito)
	  
		  if (!carrito) {
			return res.status(404).json({
			  mensaje: "Carrito no encontrado!",
			});
		  }
	  
		  
	  
		  const compraFinal = await CarritoModel.findByIdAndUpdate(carrito._id, {
			id: carrito.id,
			timestamp: carrito.timestamp,			
			productos: carrito.productos,
			username: carrito.username,
			name: carrito.name,
		  });
	  
		  await compraMail(username, carrito);		  
		  await sendSms(actualUser.phone);
		  await sendWhastapp(actualUser.phone)
		  console.log(actualUser)
		  
		  return res.status(200).json({
			mensaje: "Tu compra fue precesada",
		  });
		} catch (error) {
		  res.status(500).json({
			error: error.message,
			stack: error.stack,
		  });
		}
	  };

	  async function compraMail(username, carrito) {
		try {
		  await transporter.sendMail({
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: `Nuevo pedido de ${username}`,
			text: `${carrito}`,
		});
		} catch (err) {
			
		  console.log(err);
		}
	  }
	  // MANDAR MAIL CON CARRITO
	
	  const transporter = createTransport({
		service: 'gmail',
		port:process.env.PORT_GMAIL,
		auth: {
			user:process.env.EMAIL,
			pass:process.env.PASSWORD,
		}
	  });
	  

	
		
		