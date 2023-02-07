import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS);
        console.log('Conectado a Mongo!');
    } catch (error) {
        console.log(error);
    }
};

export default class MongoDB {
	constructor(collection, schema){
		this.collection= mongoose.model(collection, schema)
	}


	async getAll(){
		try {
			const productos = await this.collection.find({});
			return (productos)

		}  catch (err) {
			res.status(500).json({
			  error: err.message
			});
		  }
	}


	async getById (id) {
	try{
		
		const producto = await this.collection.findOne(id);
		return producto
      
	} catch (error){
		return { error: "Producto no existe" };
	}
  }




async createProduct (producto) {
try {
    const newProduct = new this.collection(producto);
	console.log(newProduct)
		return await newProduct.save();
    }
   catch (err) {
	return { error: "No se pudo ingresar el producto" }
    };
  }



	async findByIdAndUpdate(id, updateProduct) {	
		try {
			return await this.collection.findByIdAndUpdate(id, updateProduct)
				} catch(error){
			console.log(error)

		}
	}


	async deleteProduct(id) {	
		let product= await this.collection.findOne(id);		
		return await this.collection.findByIdAndDelete(product._id);
	} catch (err) {
		console.log(err);
	}



}