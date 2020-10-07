// Importo mongoose
import mongoose,{Schema} from 'mongoose';

// Creo mi esquema de categoria
const categoriaSchema = new Schema({
    /* 
    agregamos las propiedades que va tener nuestro modelo o esquema y sumado a esto debemos 
    de señalas los tipos de nuestro esquema.
    */
    nombre:{type:String, maxlength:50,unique:true,required:true},
    descripcion: {type:String,maxlength:255},
    estado: {type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

// con mongoose Convierto mi esquema categoria a un modelo llamado categoria
const Categoria = mongoose.model('categoria',categoriaSchema);

export default Categoria;