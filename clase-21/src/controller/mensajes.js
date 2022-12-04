import { MensajesModel } from '../models/mensajes';
import { normalize, schema } from 'normalizr';


export default class Mensajes{
	constructor() {       
		this.id = 0	

    }

	async getAll(){
		try {
			const mensajes = await MensajesModel.find({});
			return (mensajes)

		}  catch (err) {
			res.status(500).json({
			  error: err.message
			});
		  }
	}
	async getAllNorm(){
		try {
			const mensajes = await MensajesModel.find({});
			const user = new schema.Entity('author', {}, {idAttribute: 'mail'})
			const msj = new schema.Entity('mensajes', {author: user}, {idAttribute: '_id'})
			const finalSchema = { mensajes: [msj]};
			const normalizado = normalize(mensajes, finalSchema);

			return (normalizado) 

		}  catch (err) {
			res.status(500).json({
			  error: err.message
			});
		  }

	}


	async getById (id) {
	try{
		
		const mensaje = await MensajesModel.findById(id);
		return mensaje
      
	} catch (error){
		return { error: "El mensaje no existe" };
	}
  }




async createMensajes (mensaje) {
try {
    const newMsj = new MensajesModel(mensaje);
		return await newMsj.save();
    }
   catch (err) {
	return { error: "No se pudo ingresar el mensaje" }
    };
  }



	async findByIdAndUpdate(id, updateMsj) {	
		try {
			return await MensajesModel.findByIdAndUpdate(id, updateMsj)
				} catch(error){
			console.log(error)

		}
	}


	async deleteMensaje(id) {	
		return await MensajesModel.findByIdAndDelete(id);
	} catch (err) {
		console.log(err);
	}



}


