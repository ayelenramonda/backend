
import { Router } from 'express';
import Author from '../controller/author'
import { checkAdmin,checkBodyProduct } from '../middleweare/auth';


const routes = Router();

const author = new Author();

//Me trae todos los productos
routes.get('/', async (req, res, next) => {
    try {
        let fileData = await author.listarAll()
       res.send(fileData)
       

    } catch (err) {
        next(err);
    }
});


//Me trae los detalles de un usuario
routes.get('/:id', async (req, res, next) => {
	try {
        const id = (req.params.id)      
        let fileData = await author.listar(id)     

        res.send(fileData);

    } catch (err) {
        next(err);
    }
});


//envio un objeto con el producto, se agrega el id 
routes.post('/',  async (req, res, next) => {
	
    try {
        const data = await author.createAuthor(req.body) 
        res.send (data);

    } catch (err) {
        next(err);
    }
});


//actualizo un usuario por id
routes.put('/:id',  async (req, res, next) => {
    const id = (req.params.id)
    const body = req.body
    try {
        let data = await author.findByIdAndUpdate(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});


//borro un producto por id
routes.delete('/:id', async (req, res, next) => {
    try {
        const id =(req.params.id)
        await author.borrar(id)

        res.json({ message: 'Usuario eliminado' })

    } catch (err) {
        next(err)
    }

});




export default routes