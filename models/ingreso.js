import mongoose,{Schema} from 'mongoose';

const ingresoSchema = new Schema({
    // aca identifico quien es el usuario responsable de hacer el ingreso al almacen.
    usuario:{type: Schema.ObjectId, ref: 'usuario',required:true },
    persona:{ type: Schema.ObjectId, ref: 'persona',required:true },
    tipo_comprobante:{ type:String,maxlength:20,required:true},
    serie_comprobante: { type:String,maxlength:7},
    num_comprobante: { type:String,maxlength:10,required:true},
    impuesto:{ type:Number, required:true},
    total:{ type:Number, required:true},
    // aca en detalle coloco los parametros que quiero mostrar de los articulos done indico que 
    // 1 ingreso o compra puede tener muchos articulos.
    detalles: [{
        _id:{
            type:String,
            required:true
        },
        articulo:{
            type:String,
            required:true
        },
        cantidad:{
            type:Number,
            required:true
        },
        precio:{
            type:Number,
            required:true
        }
    }],
    estado: { type:Number, default:1},
    createdAt: { type: Date, default: Date.now }
});
const Ingreso = mongoose.model('ingreso',ingresoSchema);
export default Ingreso;