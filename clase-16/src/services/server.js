const express = require('express')
const router = express.Router();
const path = require('path')
const Contenedor = require('./../options/optionsMensaje')
const Mensajes = require('./../options/optionsMensaje')
const {options} = require('./../../knexfile');
const startTable = require('./../options/tables');
const moment = require('moment');

const app = express();

// Configuración Websocket

const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

let prod = new Contenedor("productos", options.mysql);
let msg = new Mensajes("mensajes", options.sqlite3)

// ---------------------------------
// Conectamos websocket

io.on("connection", async (socket) => {
	console.log('Usuario con id: ', socket.id, ' se ha conectado');

    let productos = await prod.getAll();
    let mensajes = await msg.getAll();

	// Socket chat
	socket.emit('messages', mensajes);

	socket.on("new-message", async (data) => {
		data.date = (moment().format('LLLL')),
		mensajes.push(data);		
		msg.addMessage(data);

        console.log(data)
		
		io.sockets.emit("messages", mensajes);
});

    // Socket productos

    socket.emit("productList", productos);

	socket.on("newProduct", async (data) => {
		await prod.addProduct(data);
        io.sockets.emit("productList", productos)
        
	})
})


app.use(express.static('public'))
app.set("socketio", io);

const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('view engine', 'ejs')
app.set('views', viewsFolderPath)


app.use("/", router);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Agrega el producto a la base de datos mysql
router.post("/", (req, res) => {
	const producto = req.body;
	prod.addProduct(producto);
	res.redirect("/");
});

async function start(){
    const inicio =  new startTable();

    let prod = await inicio.prod();
    let mess = await inicio.mess();
}

// Crear las tablas
start();



app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});
 module.exports = httpServer
