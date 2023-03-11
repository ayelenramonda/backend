import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const initMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_ATLAS);
		console.log('Conectado a Mongo Atlas');
	} catch (error) {
		console.log(error);
	}
};
