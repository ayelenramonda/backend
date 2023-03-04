import { buildSchema } from 'graphql';
import {
	saveController,
	getAll,
	deleteProductController,
	getByIdC
} from '../../controller/graphql/productos.js';

export const graphqlSchema = buildSchema(`
    input InputProducto{
        title: String!
        price: Int!
        thumbnail: String!
        stock: Int!
    }
	
    type Producto{
        id: String!
		title: String
        price: Int
        thumbnail: String
        stock: Int
       
    }
    type Query{
        getByIdC(id:String!):Producto
        getAll:[Producto]
    }
	
    type Mutation{
        saveController(data: InputProducto):Producto
		deleteProductController(id:String!):Boolean
		
    }
`);

export const graphqlRoot = {
	saveController,
	getAll,
	deleteProductController,
	getByIdC
};
