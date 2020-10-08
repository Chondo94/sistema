// Importo el objeto routerx desde nuestro modulo express-promise-router
import routerx from 'express-promise-router';
// Importamos el controlador con el objeto categoriaController
import categoriaController from '../controllers/CategoriaController';
import auth from '../middlewares/auth';
// creo esta constante para poder utilizar como un objeto nuestro express-promise-router
const router=routerx();
/* 
 Aca agregamos una ruta por cada funcion o metodo que creamos en nuestro controlador categoria.
 aca con el con el auth.verifyAlmacenero, restringimos el acceso para que pueda ingresar solo
 el almacenero y por supuesto el administrador.
 */
router.post('/add',auth.verifyAlmacenero,categoriaController.add);
router.get('/query',auth.verifyAlmacenero,categoriaController.query);
router.get('/list',auth.verifyAlmacenero,categoriaController.list);
router.put('/update',auth.verifyAlmacenero,categoriaController.update);
router.delete('/remove',auth.verifyAlmacenero,categoriaController.remove);
router.put('/activate',auth.verifyAlmacenero,categoriaController.activate);
router.put('/deactivate',auth.verifyAlmacenero,categoriaController.deactivate);

// Aca exporto todas mis rutas
export default router;