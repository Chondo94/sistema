import models from '../models';
// importamos el modulo bcryptjs en un objeto bcrypt, esto nos sirve para encriptar las contraseñas
import bcrypt from 'bcryptjs';
// importamo nuesta configuracion de token
import token from '../services/token'

export default {
    add: async (req,res,next) =>{
        try {
            // aca utilizo el objeto bcrypt y hash para encriptar todo lo que estoy recibiendo.
            req.body.password = await bcrypt.hash(req.body.password,10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            const reg=await models.Usuario.findOne({_id:req.query._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Usuario.find({$or:[{'nombre':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}]},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {
            /* 
            aca creo dos variables, pas y reg0, que me sirven para verificar si mi password es diferente o no, si
            en un caso mi passowrd es diferentes entonces lo va pasar a encriptar, de caso contrario el password
            se queda tal y como esta, ya que desde que se creo el usuario el password ese esta encriptado, solo es 
            necesario si se actualiza la contraseña y que esa contraseña nueva se encrypte.
            */
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if (pas!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }                 
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{rol:req.body.rol,nombre:req.body.nombre,tipo_documento:req.body.tipo_documento,num_documento:req.body.num_documento,direccion:req.body.direccion,telefono:req.body.telefono,email:req.body.email,password:req.body.password});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    login: async (req,res,next) => {
        try {
            // Verificamos que el usuario que intenta ingresar al sistema, este registrado y que este usuario este activo
            let user = await models.Usuario.findOne({email:req.body.email,estado:1});
            // Si el usuario existe va entrar en esta estructura condicional
            if (user){
                // con la variable match comparo si el password es correcto o igual al que se esta escribiendo
                let match = await bcrypt.compare(req.body.password,user.password);
                if (match){
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user,tokenReturn});
                } else{
                    res.status(404).send({
                        message: 'Password Incorrecto'
                    });
                }
                // Si el email no existe, va enviar un mensaje diciendo que no existe el usuario 
            } else{
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}