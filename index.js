// Mi archivo JS para agregar la configuracion de mi servidor express

// aca requiero mi modulo express y lo guardo en la constante
const express=require('express');
// voy a requerir la dependencia de morgan
const morgan=require('morgan');
const cors=require('cors');

const app=express();
// indico que utilizo morgan en modo dev(desarrollo)
app.use(morgan('dev'));
// agregamos cors
app.use(cors());

// es necesario agregar middleware express json, si vamos a recibir datos por medio de un formulario mediante Json
// y esto es mediantes peticiones por medio de POST.
// express json es una funcion agregada en el frameworks express
app.use(express.js());
app.use(express.urlencoded({extended:true}));


/*  con mi objeto, creo listen para que me escuche en el puerto 300 o en el puerto que es 
    asigando por mi servidor y luego paso a que me ejecute una funcion donde quier que me muestre un mensaje por consola. 
*/
/* 
app.set('port',process.env.PORT || 3000);
app.listen(app.get('por'),()=>{
    console.log('Servidor ejecuntandose en el puerto ' + app.get('port'));
});
 */

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
});

////////////////////////////////////

/* import path from 'path';
import mongoose from 'mongoose';
import router from './routes';
 */

//Conexión a la base de datos MongoDB
/* 
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsistema';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose => console.log('Conectado a la BD en el puerto 27017'))
.catch(err => console.log(err));
 */

/* 
const app=express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/api',router);
app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
});
 */