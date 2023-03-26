import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	author: { type: String, require: true },

	text: { type: String }
});

export const MessageModel = mongoose.model('mensajes', Schema);
