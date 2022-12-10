
import { Router } from 'express'
import { faker } from '@faker-js/faker'
const routes = Router()


faker.locale = 'es'

const devolverAleatorios = (req, res) =>{
    const respuesta =[]

    for (let i = 0; i<5; i++){
        respuesta.push({
            title: faker.commerce.product(),
            price: faker.finance.amount(5, 1000, 2, '$'),
            thumbnail: faker.image.image()
        })
    }
    res.json({
        data:respuesta
    })
}
routes.get('/', devolverAleatorios)


module.exports= routes