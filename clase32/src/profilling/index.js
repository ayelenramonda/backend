import express from 'express';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import { args } from '../config/index.js'

const app = express();

const argumentos = minimist(process.argv.slice(2));
const PORT = argumentos.puerto || 8080;

const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;
const { puerto, modo } = args;

if (clusterMode && cluster.isPrimary) {
  console.log('Ejecutando modo cluster');
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {

  app.get('/', (req, res) => {
       res.json({
      pid: process.pid,
      msg: `puerto ${PORT}`,
    });
  });
  
  app.get('/info', (req, res) => {
      try {
        const info = {			
			args: args,
			platform: process.platform,
			version: process.version,
			rssMemoryUsage: process.memoryUsage().rss,
			execPath: process.execPath,
			pid: process.pid,
			cwd: process.cwd(),
			CPUsNumbers: os.cpus().length,
        };
        console.log(info);
        res.status(200).json({
          data: info,
        });
      } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
      }
  });

  app.listen(puerto, () => {
	console.log(` PID WORKER ${process.pid} Servidor express escuchando en el puerto ${puerto}`);
  });

  
  app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({
		message,
	})
  });
}










