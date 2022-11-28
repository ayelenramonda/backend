
import { Router } from 'express';
import Producto from '../controller/productos'
import { checkAdmin } from '../middleweare/auth';

const routes = Router();

const producto = new Producto();

//Me trae todos los productos
routes.get('/', async (req, res, next) => {
    try {
        let fileData = await producto.getAll()
       res.send(fileData)
       

    } catch (err) {
        next(err);
    }
});


//Me trae los detalles de un producto
routes.get('/:id', async (req, res, next) => {
	try {
        const id = (req.params.id)      
        let fileData = await producto.getById(id)     

        res.send(fileData);

    } catch (err) {
        next(err);
    }
});


//envio un objeto con el producto, se agrega el id 
routes.post('/',  async (req, res, next) => {
	
    try {
        const data = await producto.createProduct(req.body) 
        response.send (data);

    } catch (err) {
        next(err);
    }
});


//actualizo un producto por id
routes.put('/:id',  async (req, res, next) => {
    const id = (req.params.id)
    const body = req.body
    try {
        let data = await producto.findByIdAndUpdate(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});


//borro un producto por id
routes.delete('/:id',  async (req, res, next) => {
    try {
        const id =(req.params.id)
        await producto.deleteProduct(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }

});




export default routes