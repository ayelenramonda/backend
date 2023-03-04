import express from 'express';
import rutaPrincipal from './routes/index.js';
import config from './config/index.js';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { graphqlRoot, graphqlSchema } from './services/graphql/productos.graphql.js';

const app = express();

app.use(
	'/graphql',
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: graphqlRoot,
		graphiql: true
	})
);

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', rutaPrincipal);

const PORT = config.PUERTO;
app.listen(PORT, () => {
	console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

//module.exports.app = app;
export default app;
