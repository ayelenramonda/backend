import config from '../config'
import { ProductosModel } from '../models/productos';

export const checkAdmin = (req, res, next) =>{
	if(!config.administrador)
	return res.status(401).json({
		msg:"No estás autorizado para realizar esta acción"
	})
	next();
}

export const checkBodyProduct = async (req, res, next) => {
	const { title, price, thumbnail } = req.body;
  
	if (!title || !price || !thumbnail)
	  return res.status(400).json({
		msg: 'missing Body fields',
	  });
  
	
	next();
  };

  export const validateLogIn = (req, res, next) => {
    console.log(req.session);
    if (req.session.info && req.session.info.loggedIn) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
  };
  