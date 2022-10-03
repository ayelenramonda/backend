const fs = require ('fs')



class Contenedor{
	constructor(data) {
        this.data = data;

    }

	async crearArchivo(productos) {
       
        try {
            await fs.promises.writeFile(`${this.data}.txt`, JSON.stringify(productos, null, 2), "utf-8");
        } catch (err) {
            console.log(err);
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
	async getAll(){
		try {
			const contenido = await fs.promises.readFile(`${this.data}.txt`, "utf-8");
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

	async deleteById (id) {
		const contenido = await this.getAll()
		const productoBorrado = contenido.filter((producto) => producto.id !== id)
		this.crearArchivo(productoBorrado);
		console.log("Producto eliminado");
	} catch (err) {
		console.log(err);
	}



	async deleteAll () {
		try {
            await fs.promises.writeFile(`${this.data}.txt`, JSON.stringify([]), "utf-8");
            console.log("borrado");
        } catch (err) {
            console.log(err);
        }

	}
}

module.exports = Contenedor;


