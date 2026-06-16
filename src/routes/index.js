
import { Router } from 'express';


import DashboardController from '../controllers/DashboardController.js';
import ProductController from '../controllers/ProductController.js';
import CustomerController from '../controllers/CustomerController.js';
import OrderController from '../controllers/OrderController.js';
import OrderItemController from '../controllers/OrderItemController.js';
import UserController from '../controllers/UserController.js';
import SessionController from '../controllers/SessionController.js';
import auth from '../middlewares/auth.js';

const routes = Router();

/* Products */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);


routes.use(auth);


routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.remove);


routes.get('/dashboard', DashboardController.index);


/* Customers */
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
routes.get('/customers', CustomerController.index);
routes.get('/customers/:id', CustomerController.show);
routes.post('/customers', CustomerController.store);
routes.put('/customers/:id', CustomerController.update);
routes.delete('/customers/:id', CustomerController.remove);

/* Orders */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.show);
routes.post('/orders', OrderController.store);
routes.post('/orders/:id/finish', OrderController.finish);


/* Order Items */

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Cria um novo item de pedido
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Item de pedido criado com sucesso
 */
routes.post('/order-items', OrderItemController.store);

export default routes;