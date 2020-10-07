
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
            /* 
              Aca vamos a consultar nuestros documentos creados en categoria, pero utilizaremos la funcion de RegExp, la cual nos va
              servir para que al momento de listar si le especificamos alguna palabra, muestre la lista segun esa palabra que se 
              escribe, eso es aplicado tanto en el nombre como en la descripcion, al inicio agrego el metodo $or con el fin de 
              especificar que esto se va aplicar en dos campos (nombre o descripcion), tambien veamo el parametro ('i'), este lo que 
              indica es que tome en cuenta la coincidencia entre mayusculas y minusculas y todo esta verificacion se va a realizar 
              enviando un parametro valor, que en este caso lo he declarado arriba (let valor), con base a lo que guarde ese parametro 
              que es el texto que yo le mando, es que se va ahir realizando la busqueda y va mostrar si lo que tenga coincidencia.
            */
            const reg=await models.Categoria.find({$or:[{'nombre':new RegExp(valor,'i')},{'descripcion':new RegExp(valor,'i')}]},{createdAt:0})
            // ordeno los campos de manera descendente con .sort y -1, esto va hacer con basen en la creacion del documento (createdAt).
            .sort({'createdAt':-1});
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