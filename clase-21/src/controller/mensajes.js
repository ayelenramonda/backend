import { MensajesModel } from '../models/mensajes';
import { denormalize, normalize, schema } from 'normalizr';


const author = new schema.Entity('author', {}, { idAttribute: '_id' })
const text = new schema.Entity('text', {}, { idAttribute: '_id' })
const msgSchema = new schema.Entity(
'message',
author,
text,
)


const finalSchema = new schema.Array(msgSchema)


export default class Mensajes{
	constructor() {       
		this.id = 0	

    }

	async getAll(){
		try {
			const mensajes = await MensajesModel.find().lean();
			return (mensajes)

		}  catch (err) {
			res.status(500).json({
			  error: err.message
			});
		  }

		
	}
	
	async getAllNorm(){
		try {
			const mensajes = await MensajesModel.find({}).lean();
			const normalizado = normalize(mensajes, finalSchema);

			return (normalizado) 

		}  catch (err) {
			res.status(500).json({
			  error: err.message
			});
		  }

	}

	async getAllDesNorm(){
		try {
			const mensajes = await MensajesModel.find({}).lean();
			const normalizado = normalize(mensajes, finalSchema)
			const desnormalizado = denormalize(normalizado.result, finalSchema,  normalizado.entities)
			console.log(desnormalizado)
			return (desnormalizado) 
			

		}  catch (err) {
			return { error: "no se puede normalizar" };
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


