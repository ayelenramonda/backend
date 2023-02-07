import MongoDB from "./mongoDB/mongodb.js";
import { productosSchema } from './mongoDB/schema/schema.productos.js';
import { initDb } from './mongoDB/mongodb.js';


let persistence
let argv = process.argv[2];


switch(argv) {
    
	default:	
        initDb();
        persistence = new MongoDB('productos', productosSchema);
        console.log(argv);
        break;
    
};


export async function createProduct(producto) {
    return await persistence.createProduct(producto);
};

export async function getAll() {
    return await persistence.getAll();
};

export async function getByIdPro() {
    return await persistence.getById();
};

export async function deleteProduct() {
    return await persistence.deleteProduct();
};

