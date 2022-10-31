const { Router } =  require('express');
const productos = require('../controller/productos');
const { ProdcutosController } = require('../controller/productos')

const routes = Router()




routes.get('/', async (req, res, next) => {
    try {
        let fileData = await ProdcutosController.getAll()
        res.json(fileData)
        res.render('index', { fileData });

    } catch (err) {
        next(err);
    }
});

routes.get('/:id', async (req, res, next) => {
	try {
        const id = parseInt(req.params.id)
        let fileData = await ProdcutosController.getById(id)
        

        res.json(fileData);

    } catch (err) {
        next(err);
    }
});





routes.post('/', async (req, res, next) => {
	const { body } = req
    try {
        const data = await ProdcutosController.save(req.body)
        res.redirect('/')

        //res.json({ msg: `Nuevo producto guardado con id ${data}` });

    } catch (err) {
        next(err);
    }
});

routes.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const body = req.body
    try {
        let data = await ProdcutosController.findByIdAndUpdate(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});



routes.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await ProdcutosController.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }

});




module.exports = routes