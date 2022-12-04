import { Router } from 'express';
import Mensajes from '../controller/mensajes';



const routes = Router()
const mensajes = new Mensajes();


routes.post("/", async (req, res) => {
		const mensajeCreado = await mensajes.createMensajes(req.body);
		res.send(mensajeCreado);
	});


routes.get("/", async (req,res)=>{
		let fileData = await mensajes.getAll()
		res.send(fileData) 
	
		

	})


	routes.get("/normalizado", async (req,res)=>{
		let fileData = await mensajes.getAllNorm()
		res.send(fileData) 
	
		

	})
	
	export default routes

