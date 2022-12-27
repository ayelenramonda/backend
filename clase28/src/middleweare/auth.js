import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const validateLogIn = (req, res, next) => {
  if (req.session.nombre) next();
  else res.sendFile(path.join(__dirname, "../../views/login.html"));
};

export const isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
  if(!req.isAuthenticated()) return res.status(401).json({msg: 'Unauthorized'});
  next();
}