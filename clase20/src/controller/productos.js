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

//aca quiero usar la validacion pero me pone res is not defined.. si tengo el producto lo trae
	async getById (id) {
	try{
		
		const producto = await ProductosModel.findById(id);

		if(!producto)
		return res.status(404).json({
			msg: 'Product not found!'
		});

		return producto
      
	} catch (err) {
    res.status(500).json({
      error: err.message
    });
  }

}



//este no me anda...
async createProduct (producto) {
try {
    const newProduct = new ProductosModel(producto);
		return await newProduct.create();
    }
   catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
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


