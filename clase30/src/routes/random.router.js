import express from "express";
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.resolve(__dirname, '../utils/calculo.js');

const router = express.Router();

router.get('/randoms', (req, res) => {
    const cant = req.query.cant || 100_000_000;
    const computo = fork(scriptPath);
    computo.send(cant);
    computo.on('message', (sum) => {
        res.json(sum);
    });
});


export default router