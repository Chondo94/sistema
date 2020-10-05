// Mi archivo JS para agregar la configuracion de mi servidor express

// aca requiero mi modulo express y lo guardo en la constante
const express=require('express');

// creo un objeto para que me instancie express.
const app=express();

/*  con mi objeto, creo listen para que me escuche en el puerto 300 o en el puerto que es 
    asigando por mi servidor y luego paso a que me ejecute una funcion donde quier que me muestre un mensaje por consola. 
*/
app.set('port',process.env.PORT || 3000);
app.listen(app.get('por'),()=>{
    console.log('Servidor ejecuntandose en el puerto ' + app.get('port'));
});