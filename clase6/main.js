const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>{
	console.log(`Servidor http esuchando en el puerto ${server.address().port} `)
})

const Contenedor = require ('./documentos.js')

const contenedor = new Contenedor("productos");

app.get("/", (req, res) => {	
	res.send(`<h1 style="color:blue">Bienvenidos al servidor express</h1>`);
  });


app.get("/productos", async (req, resp) => {
		await contenedor.getAll().then(productos => {
			resp.send(productos)
		})
	});

	app.get("/productosRandom", async (req, resp) => {
		await contenedor.getAll().then(async productos =>{
			const prodcutosTotales = productos.length;
			const productoId = parseInt(Math.random(prodcutosTotales)*prodcutosTotales+1);
			await contenedor.getById(productoId).then(productos =>{
				resp.send(productos);
			});
		})
	});



  




server.on("error", error => console.log(`error en servidor ${error}`))