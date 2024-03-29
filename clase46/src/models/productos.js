import mongoose from 'mongoose';

const productosSchema = new mongoose.Schema({
	title: { type: String, required: true },
	price: { type: Number, required: true },
	thumbnail: { type: String, required: true },
	stock: { type: Number, required: true }
});

export const ProductosModel = mongoose.model('productos', productosSchema);
