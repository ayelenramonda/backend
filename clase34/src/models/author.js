import mongoose from 'mongoose';

export const authorCollectionName = 'author';

const authorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},    
	apellido: {type: String, required: true},
	edad: {type: Number, required: true},
	alias: {type: String, required: true},
	avatar: {type: String, required: true}
	
    
});

export const AuthorModel = mongoose.model(
    authorCollectionName,
    authorSchema
);