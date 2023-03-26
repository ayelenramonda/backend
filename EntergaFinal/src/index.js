import express from 'express';
import rutaPrincipal from './routes/index.js';
import MongoStore from 'connect-mongo';
import config from './config/index.js';
import session from 'express-session';
import passport from 'passport';
import { loginFunc, signUpFunc } from './services/auth.js';
import { initDb } from './db/database.js';
import cluster from 'cluster';
import os from 'os';
import { args } from './config/index.js';
import { infoLogger, warnLogger, errorLogger } from './logs/index.js';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import { saveMsgController, getAllControllerMsg } from './controller/mensajes.js';

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);

app.set('socketio', io);

io.on('connection', async (socket) => {
	console.log('Usuario con id: ', socket.id, ' se ha conectado');

	socket.emit('messages', await getAllControllerMsg());

	socket.on('new-message', async (msg) => {
		console.log(msg);
		let response = await saveMsgController(msg);
		console.log(response + 'index');
		return response;
	});
});

app.get('/', async (req, res, next) => {
	try {
		let fileData = await getAllControllerMsg();
		//console.log(fileData);
		res.render('index', { fileData });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

app.post('/', saveMsgController);

const numsCPUs = os.cpus().length;
const { puerto, modo } = args;

if (modo === 'cluster' && cluster.isPrimary) {
	infoLogger.info(`Cantidad de nucleos del sistema: ${numsCPUs}`);
	infoLogger.info(`PID MASTER: ${process.pid}`);
	warnLogger.warn(`PID MASTER: ${process.pid}`);
	errorLogger.error(`PID MASTER: ${process.pid}`);
	for (let i = 0; i < numsCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code) => {
		infoLogger.info(`Worker ${worker.process.pid} with code ${code}`);
		cluster.fork();
	});
} else {
	initDb();
	infoLogger.info('conenctado a la db');

	httpServer.listen(puerto, () => {
		infoLogger.info(
			` PID WORKER ${process.pid} Servidor express escuchando en el puerto ${puerto}`
		);
	});

	app.use((err, req, res, next) => {
		const status = err.status || 500;
		const message = err.message || 'Internal Server Error';

		res.status(status).json({
			message
		});
	});
}

// tiempo de sesion
const ttlSeconds = 600;

const StoreOptions = {
	store: MongoStore.create({
		mongoUrl: config.MONGO_ATLAS,
		autoRemove: 'Interval',
		autoRemoveInterval: 600, // tiempo que se borra la sesion
		crypto: {
			secret: config.CRYPTO_SECRET //las info queda encriptada en la base
		}
	}),
	secret: config.SECRET_STRING,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: ttlSeconds * 1000
	}
};

// Websocket

// const httpServer = createServer(app);

// const io = new Server(httpServer, { cors: { origin: '*' } });
const PORT = 8080;

// Objeto donde se guardan los mensajes

// const messages = [];

// const productoMostrar = [];

// // Conectamos websocket

// io.on('connection', async (socket) => {
// 	console.log('Usuario con id: ', socket.id, ' se ha conectado');

// 	// Socket chat
// 	socket.emit('messages', messages);

// 	socket.on('new-message', (data) => {
// 		(data.date = moment().format('LLLL')), messages.push(data);
// 		io.sockets.emit('messages', messages);
// 	});

// 	socket.emit('productoMostrar', productoMostrar);

// 	socket.on('newProduct', (data) => {
// 		productoMostrar.push(data);
// 		io.sockets.emit('productoMostrar', productoMostrar);
// 	});
// });

app.use(express.static('public'));

app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

const viewsFolderPath = path.resolve(__dirname, './views');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', rutaPrincipal);

// const server = httpServer.listen(PORT, () => {
// 	console.log(`Servidor http escuchando en el puerto ${PORT}`);
// });
// server.on('error', (error) => console.log(`Error en servidor ${error}`));
