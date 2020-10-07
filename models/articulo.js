// Importo mongoose y schema
import mongoose,{Schema} from 'mongoose';

// Creo el esquema
const articuloSchema = new Schema({
    // defino las propiedades del esquema, y las caracteristicas de las propiedades
    // aca hago la relacion con mi modelo categoria
    categoria: {type: Schema.ObjectId, ref:'categoria'},
    // sigo definiendo las caracteristicas o tipos de nuestras propiedades(codigo,nobre,descripcion,etc.)
    codigo: {type: String,maxlength:64},
    nombre:{type:String,maxlength:50,unique:true,required:true},
    descripcion: {type:String,maxlength:255},
    precio_venta:{type:Number,required:true},
    stock:{type:Number,required:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

// convierto mi esquema a un modelo.
const Articulo = mongoose.model('articulo',articuloSchema);
// exporto el modelo
export default Articulo;