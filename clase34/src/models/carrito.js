import mongoose from 'mongoose';
import { productosSchema } from './productos.js';

export const carritoCollectionName = 'carrito';

const carritoSchema = new mongoose.Schema({
    id: {type:Number},
    timestamp : {type:String},
    productos: {type: Array}
    
});

export const CarritoModel = mongoose.model(
    carritoCollectionName,
    carritoSchema
);