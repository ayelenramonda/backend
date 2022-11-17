import fs from 'fs';
import path from 'path';
const filePath = path.resolve(__dirname, "../../productos.json");
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

export default class Producto{
	constructor() {
       
		this.id = 0
		

    }

	async createData(prod) {
		try {
			//await fs.promises.writeFile(`${this.data}`, JSON.stringify(prod, null, 2), "utf-8");
			await fs.promises.writeFile(filePath, JSON.stringify(prod, null, 2), "utf-8");
			//return prod;
		} catch (err) {
			console.log("No se pudo agregar el archivo")
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

	



async save(prod) {
	try {
		const contenido = await this.getAll();
		prod.id = uuidv4();
		prod.timeStamp = (moment().format('LLLL'));
		contenido.push(prod);
		this.createData(contenido);
		console.log("Nuevo producto ingresado")
		return prod;
	} catch (err) {
		await this.createData([]);
		const contenido = await this.getAll();
		prod.id = uuidv4();
		prod.timeStamp = (moment().format('LLLL'));
		contenido.push(prod);
		this.createData(contenido);
		console.log("Nuevo producto ingresado desde catch")
		return prod;
	}

}


	async findByIdAndUpdate(id, updateProduct) {	
		try {const exist = await this.exists(id);
		if (!exist) throw new Error(`No existe item con ID ${id}`)

		const contenido = await this.getAll();
		const productoId = contenido.findIndex(producto => producto.id == id)

		const productoViejo = contenido[productoId]

		contenido[productoId] = {...updateProduct, id}
		await this.createData(contenido)

		} catch(error){
			console.log(error)

		}
		
		
		

	}


	async findByIdAndDelete(id) {	
		const contenido = await this.getAll()
		const productoBorrado = contenido.filter((producto) => producto.id !== id)
		this.createData(productoBorrado);
		console.log("Producto eliminado");
	} catch (err) {
		console.log(err);
	}



}


