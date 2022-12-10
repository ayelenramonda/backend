import { Router } from 'express';
import Carrito from '../controller/carrito'
import Producto from '../controller/productos'

const routes = Router()

const carrito = new Carrito();
const productos = new Producto();


//envie por body { "productos": [{} ]} y recibi en el json 
// {
//     "id": "c7bf1e7f-eedb-4cf2-afc4-4412388cc26d",
//     "timeStamp": "Thursday, November 17, 2022 12:53 PM",
//     "productos": []
// }
routes.post("/", async (req, res) => {
		const carritoCreado = await carrito.crearCarrito(req.body);
		res.send(carritoCreado);
	});


//"msj": "{ Carrito con id: c7bf1e7f-eedb-4cf2-afc4-4412388cc26d eliminado }"
	routes.delete("/:id", async (req, res) => {
		const carritoBorrado = await carrito.borrar(req.params.id);
		res.send(carritoBorrado);
	});


// "msj": "Producto con id: 611c784a-0201-400b-9655-a774b3066fa1 eliminado del carrito con id: 166c47b2-0a7d-40f6-8100-5f4448cc3c0a"
	routes.delete("/:id/productos/:idPrd", async (req, res) => {
		const productoBorrado = await carrito.borrarProd(
			req.params.idPrd,
			req.params.id
		);
		res.send(productoBorrado);
	})


// me devuelve los productos del carrito consultado
//localhost:8080/api/carrito/166c47b2-0a7d-40f6-8100-5f4448cc3c0a/productos

	routes.get("/:id/productos", async (req, res) => {
		const id = (req.params.id);
		const cont = await carrito.listarProd(id);
		res.send(cont);
		console.log(cont)
	});



	routes.get("/", async (req,res)=>{
		
			let fileData = await carrito.listarAll()
		   res.send(fileData)
		   
	
		

	})

	
	
//localhost:8080/api/carrito/166c47b2-0a7d-40f6-8100-5f4448cc3c0a/productos/b8703db0-8975-4a27-b4ed-08ee4f25ec0c	
//"msj": "Producto agregado al carrito"	
	routes.post("/:id/productos/:idPrd", async (req, res) => {
		const respuesta = await carrito.guardarProductoEnCarrito(
			req.params.idPrd,
			req.params.id
		);
		res.send(respuesta);
	});
	
	
	
	
	
	export default routes

