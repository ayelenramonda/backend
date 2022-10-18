const fs = require ('fs')
const filePath = '../clase7y8/src/productos.json'

class Contenedor{
	constructor(data) {
        this.data = data;

    }

	async crearArchivo(productos) {
       
        try {
            await fs.promises.writeFile(`${this.data}`, JSON.stringify(productos, null, 2), "utf-8");
        } catch (err) {
            console.log(err);
        }
    }

	async exists(id) {
		const data = await this.getAll()
		const indice = data.findIndex(product => product.id == id)
		return indice >= 0;
	}


	async getAll(){
		try {
			const contenido = await fs.promises.readFile(filePath, 'utf-8')
			return JSON.parse(contenido)
			
		} catch (error) {
			console.log(error)
			
		}
	}


	async getById (id) {
	try{
		const contenido = await this.getAll()
		const productoBuscado = contenido.filter((producto) => producto.id === id)
		return productoBuscado ? productoBuscado : null
	}catch (err) {
		console.log("Producto no encontrado", err);

	}

}




	async save(producto) {
		const contenido = await this.getAll();
		const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
		producto.id = indice + 1;
		contenido.push(producto);
		this.crearArchivo(contenido);
		console.log(`Producto ingresado con id ${producto.id}`);
		return producto.id;

}
	async findByIdAndUpdate(id, updateProduct) {	
		const exist = await this.exists(id);
		if (!exist) throw new Error(`No existe item con ID ${id}`)

		const contenido = await this.getAll();
		const productoId = contenido.findIndex(producto => producto.id == id)

		const productoViejo = contenido[productoId]

		const productoAModificar = {
			id: productoViejo.id,
			title: updateProduct.title,
			price: updateProduct.price
		}

		productos.splice(productoId, 1, productoAModificar)

		await this.crearArchivo(contenido)
		return productoAModificar

	}


	async findByIdAndDelete(id) {	
		const contenido = await this.getAll()
		const productoBorrado = contenido.filter((producto) => producto.id !== id)
		this.crearArchivo(productoBorrado);
		console.log("Producto eliminado");
	} catch (err) {
		console.log(err);
	}

}



const instanciaProductosApi = new Contenedor(filePath)

module.exports = {
	ProdcutosController : instanciaProductosApi
}