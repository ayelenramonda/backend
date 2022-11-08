//const server = require('./services/server')
import config from './config'
import server from './services/server'


server.listen(config.puerto, () => {
	console.log(`servidor escuchando en el puerto ${config.puerto}`)
})

server.on('error', (err) =>{
	console.log ('error atajado', err)
})