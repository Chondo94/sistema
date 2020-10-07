// Importo el objeto routerx desde nuestro modulo express-promise-router
import routerx from 'express-promise-router';
// Importamos el controlador con el objeto categoriaController
import categoriaController from '../controllers/CategoriaController';

// creo esta constante para poder utilizar como un objeto nuestro express-promise-router
const router=routerx();

// Aca agregamos una ruta por cada funcion o metodo que creamos en nuestro controlador categoria.
router.post('/add',categoriaController.add);
router.get('/query',categoriaController.query);
router.get('/list',categoriaController.list);
router.put('/update',categoriaController.update);
router.delete('/remove',categoriaController.remove);
router.put('/activate',categoriaController.activate);
router.put('/deactivate',categoriaController.deactivate);

// Aca exporto todas mis rutas
export default router;