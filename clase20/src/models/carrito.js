import mongoose from 'mongoose';
import { productosCollectionName } from './productos.js';

export const carritoCollectionName = 'carrito';

const carritoSchema = new mongoose.Schema({
    id: Number,
    timestamp : String,
    productos: Array
});

export const CarritoModel = mongoose.model(
    carritoCollectionName,
    carritoSchema
);