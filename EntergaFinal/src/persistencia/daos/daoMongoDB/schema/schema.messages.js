import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	nombre: { type: String, require: true },
	apelido: { type: String, require: true },
	edad: { type: Number, require: true },
	alias: { type: String, require: true },
	avatar: { type: String, require: true },
	mail: { type: String, require: true },
	text: { type: String }
});

export const MessageModel = mongoose.model('mensajes', Schema);
