const fs = require ('fs')



class Contenedor{
	async save(producto){
		try {
			await fs.promises.writeFile("./productos.txt", JSON.stringify(producto, null , 2), 'utf-8')
			
		} catch (error) {
			
			console.log(error)
		}
	}

	async getAll(){
		try {
			const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
			return JSON.parse(contenido)
		} catch (error) {
			console.log(error)
			
		}
	}

	async newProduct (nuevo){		
			const contenido = await this.getAll()
			const indice = contenido.sort((a, b) => b.id - a.id)[0].id
			nuevo.id = indice + 1 
			contenido.push(nuevo)
			this.save(contenido)
	}

	async getById (id) {
		const contenido = await this.getAll()
		const productoBuscado = contenido.filter((producto) => producto.id === id)
		console.log(productoBuscado)

	}

	async deleteById (id) {
		const contenido = await this.getAll()
		const productoBorrado = contenido.filter((producto) => producto.id !== id)
		this.save(productoBorrado)

	}

	async deleteAll () {
		const borrarTodo = []
		this.save(borrarTodo)

	}
}


const contenedor = new Contenedor()

/*const otro = [                                                                                                                                                   
    {                                                                                                                                                    
      title: 'revista',                                                                                                                                 
      price: 500,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                                                                                                                                                    
    }                                                                                                                                                   
   {                                                                                                                                                    
      title: 'Calculadora',                                                                                                                              
      price: 234.56,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
      id: 2                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Globo Terráqueo',                                                                                                                          
      price: 345.67,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
      id: 3                                                                                                                                              
    }                                                                                                                                                    
  ]*/

contenedor.getById(4)
