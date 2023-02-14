import mongoose from 'mongoose';

export const carritoSchema = new mongoose.Schema({
	id: { type: Number },
	timestamp: { type: String },
	productos: { type: Array },
	username: { type: String },
	name: { type: String }
});
