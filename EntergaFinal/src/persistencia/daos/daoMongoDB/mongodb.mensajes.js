import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MessageModel } from './schema/schema.messages.js';

dotenv.config();

export default class DaoMongoDBMessage {
	static init() {
		mongoose.connect(process.env.MONGO_ATLAS, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Conectado a MongoDB!');
			}
		});
	}

	async getAllMsg() {
		try {
			const msg = await MessageModel.find({});
			return msg;
		} catch (err) {
			res.status(500).json({
				error: err.message
			});
		}
	}

	async getById(id) {
		try {
			const msg = await MessageModel.findById(id);
			return msg;
		} catch (error) {
			return { error: 'Producto no existe mongoDB' };
		}
	}

	async saveMsg(data) {
		try {
			const newMessage = new MessageModel(data);
			console.log(newMessage);
			return await newMessage.save();
		} catch (err) {
			return { error: 'No se pudo ingresar el mensaje' };
		}
	}
}
