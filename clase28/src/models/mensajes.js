import mongoose from 'mongoose';

export const mensajesCollectionName = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    author: {
		mail:{type: String, required: true}, 
		nombre: {type: String, required: true}, 
		apellido: {type: String, required: true}, 
		edad: {type: Number, required: true}, 
		alias: {type: String, required: true}, 
		avatar: {type: String, required: true}},    
	text: {
		
		mensaje:{type: String, required: true}
	}    
    
});

export const MensajesModel = mongoose.model(
    mensajesCollectionName,
    mensajesSchema
);