import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const routes = Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.get('/products/:id', ProductController.show);
routes.delete('/products/:id', ProductController.remove);
routes.put('/products/:id', ProductController.update);

export default routes;// cole aqui