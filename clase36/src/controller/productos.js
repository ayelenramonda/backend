import { ProductosModel } from '../models/productos';


export default class Producto{
	constructor() {       
		this.id = 0	

    }

	async getAll(){
		try {
			const productos = await ProductosModel.find({});
			return (productos)

		}  catch (err) {
			res.status(500).json({
			  error: err.message
			});
		  }
	}


	async getById (id) {
	try{
		
		const producto = await ProductosModel.findById(id);
		return producto
      
	} catch (error){
		return { error: "Producto no existe" };
	}
  }




async createProduct (producto) {
try {
    const newProduct = new ProductosModel(producto);
		return await newProduct.save();
    }
   catch (err) {
	return { error: "No se pudo ingresar el producto" }
    };
  }



	async findByIdAndUpdate(id, updateProduct) {	
		try {
			return await ProductosModel.findByIdAndUpdate(id, updateProduct)
				} catch(error){
			console.log(error)

		}
	}


	async deleteProduct(id) {	
		return await ProductosModel.findByIdAndDelete(id);
	} catch (err) {
		console.log(err);
	}



}


