import express from 'express'
import { args } from './config/index.js'
import InfoRouter from './routes/info.js'
import RandomRouter from './routes/random.router.js'
import cluster from 'cluster';
import os from "os";

const numsCPUs = os.cpus().length;
const { puerto, modo } = args;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


if (modo === "cluster" && cluster.isPrimary) {
  console.log(`Cantidad de nucleos del sistema: ${numsCPUs}`);
  console.log(`PID MASTER: ${process.pid}`);
  for (let i = 0; i < numsCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code) => {
    console.log(`Worker ${worker.process.pid} with code ${code}`);
    cluster.fork();
  });
} else {
  app.use('/api',InfoRouter, RandomRouter)
  
      

      
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









