import express from "express";
import { info } from '../controller/info.js'

const routes = express.Router();

routes.get('/info', info)


export default routes;


