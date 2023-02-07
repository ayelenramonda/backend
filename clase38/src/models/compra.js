import mongoose from 'mongoose';

export const compraCollectionName = 'compra';

const compraSchema = new mongoose.Schema({
    user: {type: String, required: true},
    carrito: {type: String, required: true},
	producto : {type:String, required: true}
    
    
});

export const CompraModel = mongoose.model(
    compraCollectionName,
    compraSchema
);