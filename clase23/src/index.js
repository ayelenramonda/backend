import express from 'express'
import rutaPrincipal from './routes/user.router.js'
import MongoStore from 'connect-mongo'
import config from './db/database.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path'

// tiempo de sesion
const ttlSeconds = 300;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS,
    autoRemove: 'Interval',
    autoRemoveInterval: 300,// tiempo que se borra la sesion
    crypto: {
      secret: '1234',     //las info queda encriptada en la base
    },
  }),
  secret: 'secretString', 
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const app = express();

app.use(express.static('public'))

app.use(cookieParser());
app.use(session(StoreOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('view engine', 'ejs')
//app.set('views', viewsFolderPath)

app.use('/', rutaPrincipal)


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});