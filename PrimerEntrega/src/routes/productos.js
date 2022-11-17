
import { Router } from 'express';
import Producto from '../controller/productos'
import { checkAdmin } from '../middleweare/auth';

const routes = Router();

const producto = new Producto();

//Me trae todos los productos
routes.get('/', async (req, res, next) => {
    try {
        let fileData = await producto.getAll()
       res.json(fileData)
       

    } catch (err) {
        next(err);
    }
});


//Me trae los detalles de un producto
routes.get('/:id', async (req, res, next) => {
	try {
        const id = (req.params.id)

        if(id.length < 20 )
        return res.status(400).json({
          msg: "no existe ese producto"
        })

        let fileData = await producto.getById(id)
        

        res.json(fileData);

    } catch (err) {
        next(err);
    }
});


//envio un objeto con el producto, se agrega el id 
routes.post('/', checkAdmin,  async (req, res, next) => {
	const { body } = req
    try {
        const data = await producto.save(req.body)       

        res.json({ msg: `Nuevo producto guardado con id ${data.id}` });

    } catch (err) {
        next(err);
    }
});


//actualizo un producto por id
routes.put('/:id', checkAdmin, async (req, res, next) => {
    const id = (req.params.id)
    const body = req.body
    try {
        let data = await producto.findByIdAndUpdate(id, body)

        res.json({ msg: `El producto con id ${id} fue cambiado exitosamente` });

    } catch (err) {
        next(err);
    }
});


//borro un producto por id
routes.delete('/:id', checkAdmin, async (req, res, next) => {
    try {
        const id =(req.params.id)
        await producto.findByIdAndDelete(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }

});




export default routes