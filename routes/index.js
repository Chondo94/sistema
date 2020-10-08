// Aca importo todos las rutas que he creado.

// Importo nuestro modulo de express-promise-route
import routerx from 'express-promise-router';
// improta el objeto categoriaRoute
import categoriaRouter from './categoria';
// importo el objeto de articuloRoute, yo le doy el nombre de articuloRouter haciendo referencias a las rutas que tengo en articulo
import articuloRouter from './articulo';
import usuarioRouter from './usuario';

// declaro mi contaste router
const router=routerx();

// aca le indico que cuando utilice el /categoria las rutas se van a gestionar con el
// categoriaRouter que viene siendo el categoria.js
router.use('/categoria',categoriaRouter);
router.use('/articulo',articuloRouter);
router.use('/usuario',usuarioRouter);
export default router;