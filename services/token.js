// importo nuestro modulo jsonwebtoken con un objeto jwt
import jwt from 'jsonwebtoken';
// importo los modelos
import models from '../models';

/* 
esta funcion checToken sirva para que cuando el usuario deja iniciada su sesion el no tenga que volverse a loggear
sino que con ese token valido pueda ingresar al sistema. pero el token tiene que ser valido aun.
*/
async function checkToken(token){
    let __id = null;
    try{
        const {_id}= await jwt.decode(token);
        __id = _id;
    } catch (e){
        return false;
    }
    // aca valido que token sea valido pero que tambien el estado del usuario aun este activo.
    const user = await models.Usuario.findOne({_id:__id,estado:1});
    if (user){
        const token = jwt.sign({_id:__id},'clavesecretaquegeneratoken',{expiresIn:'1d'});
        return {token,rol:user.rol};
    } else {
        return false;
    }
}

export default {
    // con esta funcion encode creo el token
    encode: async (_id) => {
        /* 
        con cost token, aca creamos el token, el cual va estar compuesto por 3 parametros los cuales son, _id,
        una clave secreta que este caso coloque clavesecretaquegeneratoken para mientras y el 
        tiempo en que va expirar ese token, es este caso queda con 1 dia, pero bien puedo colocarle
        30 minutos, 2 hora y tiempos asi.
        */
        const token = jwt.sign({_id:_id},'clavesecretaquegeneratoken',{expiresIn: '1d'});
        return token;
    },
    // con esta funcion me sirve para recibir el token y verficar si es correcto
    decode: async (token) => {
        try {
            // declaramos esta constante dode vamos a recibir el objeto toke, pero solo vamos a trabajar con el parametro _id, por eso esta en llaves
            const {_id} = await jwt.verify(token,'clavesecretaparagenerartoken');
            const user = await models.Usuario.findOne({_id,estado:1});
            if (user){
                return user;
            } else{
                return false;
            }
        } catch (e){
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}