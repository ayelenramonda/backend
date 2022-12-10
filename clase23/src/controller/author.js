import { AuthorModel } from '../models/author'
import moment from 'moment';



 export default class Author{
	constructor() {       
		this.id = 0	

    }		

			
	async createAuthor (author) {
		try {
			const newUsuario = new AuthorModel(author);
				return await newUsuario.save();
			}
		   catch (err) {
			return { error: "No se pudo ingresar el usuario" }
			};
		  }
		
			async listar(id) {
				try{
					return await AuthorModel.findById(id)
			
				}catch(error){
					return {error: "No existen usuarios"}
				}
			}

			
			//Obtener un mensaje de un usuario
			async listarMsj(id){
					 const authMsj = await this.listar(id);
					 //console.log(carrProd.length);
					 return authMsj.text;
						
			}
		
			// Obtener todos los usuarios
			async listarAll() {
				try {
					const carr = await AuthorModel.find({});
					return (carr)
				
				} catch (err) {
					return {error: "No existen usuarios"}
				}
			}
			
		
		
			
			// Agrega un mensaje específico en un usuario específico
			
		
		async guardarMsjEnAuthor(idMsj, idAuthor) { 
			const msj = await this.mensajes.getById(idMsj); 			
			console.log(msj)			
			return await AuthorModel.findByIdAndUpdate({ _id: idAuthor }, { $push: { text: msj } }); 
			
			}

			async findByIdAndUpdate(id, updateAuthor) {	
				try {
					return await AuthorModel.findByIdAndUpdate(id, updateAuthor)
						} catch(error){
					console.log(error)
		
				}
			}
		
		
			// Borra un usuario en específico
			async borrar(id) {
				try {
					
					return await AuthorModel.findByIdAndDelete(id);
				} catch (err) {
					return { error: "No se pudo eliminar el usuario" }
				}
			}
		
			// Borra un mensaje en específico de un usuario
			async borrarMsj(idMsj, idAuthor){
		
				try {
					const msj = await this.mensajes.getById(idMsj);
					return await AuthorModel.findByIdAndUpdate(idAuthor, { $pull: { text: msj } });
				} catch (err) {
					return { error: "No se pudo eliminar el mensaje" }
				}
		
			}
	}
		
		