import routerx from 'express-promise-router';
import articuloController from '../controllers/ArticuloController';
import auth from '../middlewares/auth';

const router=routerx();

/* 
 Aca agregamos una ruta por cada funcion o metodo que creamos en nuestro controlador articulo.
 aca con el con el auth.verifyAlmacenero, restringimos el acceso para que pueda ingresar solo
 el almacenero y por supuesto el administrador.
 */
router.post('/add',auth.verifyAlmacenero,articuloController.add);
router.get('/query',auth.verifyAlmacenero,articuloController.query);
router.get('/list',auth.verifyAlmacenero,articuloController.list);
router.put('/update',auth.verifyAlmacenero,articuloController.update);
router.delete('/remove',auth.verifyAlmacenero,articuloController.remove);
router.put('/activate',auth.verifyAlmacenero,articuloController.activate);
router.put('/deactivate',auth.verifyAlmacenero,articuloController.deactivate);

export default router;