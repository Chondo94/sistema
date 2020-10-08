/* 
  Los middlewares nos van a permiter administrar el acceso a las rutas segun sea el rol de los usuarios
  en este caso vamos a tener tres tipos de usuario los cuales son, Administrador, Almacenero y vendedor. 
*/
// importo el archivo token al cual le pongo de nombre tokenServices
import tokenService from '../services/token';

// Exporto funciones 
export default {
    // con esta funcion verifico si el usuario esta correctamente autenticado
    verifyUsuario: async (req,res,next) => {
        // Verifico si el usuario no ha enviado el token, sino lo ha enviado devuelve un Not Foun 404
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        // si el usuario envio el token entonces se me ejecuta este bloque de codigo
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor' || response.rol=='Almacenero'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    // con esta funcion verifico si el usuario es administrador
    verifyAdministrador: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    // con esta funcion verifico si el usuario es Almacenero
    verifyAlmacenero: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol=='Almacenero'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    // con esta funcion verifico si el usuario es Vendedor
    verifyVendedor: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    }
}