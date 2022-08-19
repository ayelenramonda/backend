class Usuario {
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}


	getFullName(){
		 return (` ${this.nombre} ${this.apellido}`)
	}

	countMascotas(){
		return (`${this.mascotas.length}`)
	}

	addMascota(){
		this.mascotas.push("pepe")

	}

	addBook(){
		this.libros.push({"nombre":"El librito", "autor":"Oscar Perez"})
	}

	getBookNames(){
	return this.libros.map(libro => `${libro.nombre}`);
	}
}

const usuario1 = new Usuario ("clara", "perez", [{"nombre":"El principito", "autor":"un autor"},{"nombre": "caperucita", "autor":"otro autor"}],["princesa","chiche","kako"])

console.log(usuario1.getFullName())
console.log(usuario1.countMascotas())
console.log(usuario1.getBookNames())
console.log(usuario1.addMascota())
console.log(usuario1.countMascotas())
console.log(usuario1.addBook())
console.log(usuario1.getBookNames())
