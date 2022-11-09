
import { Router } from 'express';
import Producto from '../controller/productos'
import { checkAdmin } from '../middleweare/auth';

const routes = Router();

const producto = new Producto();

routes.get('/', async (req, res, next) => {
    try {
        let fileData = await producto.getAll()
       res.json(fileData)
        //res.render('index', { fileData });

    } catch (err) {
        next(err);
    }
});

routes.get('/:id', async (req, res, next) => {
	try {
        const id = parseInt(req.params.id)
        let fileData = await producto.getById(id)
        

        res.json(fileData);

    } catch (err) {
        next(err);
    }
});





// routes.post("/", async (req, res) => {
// 	console.log(req.body);
// 	const response = await producto.createData(req.body)
// 	res.send(response);
// });


routes.post('/',  checkAdmin, async (req, res, next) => {
	const { body } = req
    try {
        const data = await producto.save(req.body)
        //res.redirect('/')

        res.json({ msg: `Nuevo producto guardado con id ${data.id}` });

    } catch (err) {
        next(err);
    }
});




routes.put('/:id', checkAdmin, async (req, res, next) => {
    const id = parseInt(req.params.id)
    const body = req.body
    try {
        let data = await producto.findByIdAndUpdate(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});



routes.delete('/:id', checkAdmin, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await producto.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }

});




export default routes