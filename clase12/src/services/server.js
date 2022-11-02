const express = require('express')
const rutaPrincipal = require('../routes/index')
const path = require('path')
const { ProdcutosController } = require('../controller/productos')
const moment = require('moment');


const app = express();

// Configuración Websocket

const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

// Objeto donde se guardan los mensajes

const messages = [];

const productoMostrar =[
]




// ---------------------------------
// Conectamos websocket

io.on("connection", (socket) => {
	console.log('Usuario con id: ', socket.id, ' se ha conectado');

	// Socket chat
	socket.emit("messages", messages);

	socket.on("new-message", (data) => {
		data.date = (moment().format('LLLL')),
		messages.push(data);		
		io.sockets.emit("messages", messages);

	});

   

    socket.emit("productoMostrar",  productoMostrar)

	socket.on("newProduct",  (data) => {
		//let producto =  ProdcutosController.getAll();
        productoMostrar.push(data)
        io.sockets.emit("productoMostrar",  productoMostrar )
        
	})
})


app.use(express.static('public'))

const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('view engine', 'ejs')
app.set('views', viewsFolderPath)

app.get('/', async (req, res, next) => {
    try {
        let fileData = await ProdcutosController.getAll()
        //res.json(fileData)
        res.render('index', { fileData });

    } catch (err) {
        next(err);
    }
});




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', rutaPrincipal)





app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});
module.exports = httpServer