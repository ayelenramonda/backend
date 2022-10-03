const Contenedor = require('./documentos');



const archivo = [
    {
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: 1
    },
    {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2
    },
    {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3
    }
];



const productoNuevo = {
    title: "Bolso",
    price: 500,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Pencil-256.png"
}



async function test(){
    try{
    const contenedor = new Contenedor("productos");

    //let nuevo = await contenedor.crearArchivo(archivo);


    // let producto = await contenedor.save(productoNuevo);
	// console.log(`El producto con id ${producto} fue ingresado con éxito`);
    

    // let buscarId = await contenedor.getById(3);
    // console.log("Buscaste: ", buscarId);

    // let borrarId = await contenedor.deleteById(2);
    // console.log("El elemento fue borrado con exito");

    // let obtenerTodo = await contenedor.getAll();
    // console.log(obtenerTodo);

    // let borrarTodo = await contenedor.deleteAll();
    // console.log("Se han eliminado todos los productos" );
    
    } catch(err){
        console.log("Error", err);
    }

}

test();