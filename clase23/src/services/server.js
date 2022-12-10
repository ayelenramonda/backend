import express from 'express'
import rutaPrincipal from '../routes/index'
import MongoStore from 'connect-mongo'
import config from '../db/database'
import cookieParser from 'cookie-parser';
import session from 'express-session';

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
app.use('/api', rutaPrincipal)



app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});


export default app