
// importo mis modelos
import models from '../models';

// Exportamos nuestras funcionees
export default {
    // Exporto la funcion add
    // con esta funcion me va servir para agregar
    // esta funcion es asyncrona y va esperar 3 parametros, req, res, next
    add: async (req,res,next) =>{
        try {
            // creo mi constante reg, que es de registro
            const reg = await models.Categoria.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // Exporto la funcion query
    // con esta funcion me va servir para realizar consultas
    query: async (req,res,next) => {
        try {
            // Aca verifico si encuentro un documento con el id indicado
            const reg=await models.Categoria.findOne({_id:req.query._id});
            // si no lo encuentro me va devolver un status 404 de no escontrado
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            // y si lo encuentra me va devovler el registro solicitado
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
    // Exporto la funcion list
    // con esta me va servir para en listar mis categorias
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Categoria.find({});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // Exporto la funcion update
    // con esta funcion me va servir para actualizar
    update: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre,descripcion:req.body.descripcion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // Exporto la funcion remove
    // con esta funcion me va servir para eliminar
    remove: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // Exporto la funcion me va servir para activar una categoria que este desactivada
    activate: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // Exporto la funcion me va servir para desactivar una categoria que este activada
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}