const server = require('./services/server')



const puerto = 8080;
server.listen(puerto, () => {
	console.log(`servidor escuchando en el puerto ${puerto}`)
})

server.on('error', (err) =>{
	console.log ('error atajado', err)
})