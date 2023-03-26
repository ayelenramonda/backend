import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	author: {
		mail: { type: String, require: true },
		timeStamp: { type: Date, default: Date.now }
	},
	text: { type: String }
});

export const MessageModel = mongoose.model('mensajes', Schema);
