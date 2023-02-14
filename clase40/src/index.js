import express from 'express'
import rutaPrincipal from './routes/index.js'
import MongoStore from 'connect-mongo'
import config from './config/index.js'
import session from 'express-session';
import passport from 'passport';
import { loginFunc, signUpFunc } from './services/auth.js'

const app = express();
 
  app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({
		message,
	})
  });
  

// tiempo de sesion
const ttlSeconds = 600;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS,
    autoRemove: 'Interval',
    autoRemoveInterval: 600,// tiempo que se borra la sesion
    crypto: {
      secret: config.CRYPTO_SECRET,     //las info queda encriptada en la base
    },
  }),
  secret: config.SECRET_STRING, 
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};


app.use(express.static('public'))

app.use(session(StoreOptions));
app.use(passport.initialize())
app.use(passport.session())

passport.use('login', loginFunc)
passport.use('signup', signUpFunc)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('view engine', 'ejs')
//app.set('views', viewsFolderPath)

app.use('/api', rutaPrincipal)


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});


const PORT = config.PUERTO;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});