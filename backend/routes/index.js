//routes/index.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const OrderController = require('../controllers/OrderController');
const OrderStatusController = require('../controllers/OrderStatusController');


// defined responses for products
router.get('/shop_api/products', ProductController.getAll);
router.get('/shop_api/products/:id', ProductController.getById);
router.post('/shop_api/products', ProductController.store);
router.put('/shop_api/products', ProductController.updateById);

// defined responses for categories
router.get('/shop_api/categories', CategoryController.getAll);
// defined responses for orders
router.get('/shop_api/orders', OrderController.getAll);
router.post('/shop_api/orders', OrderController.store);
router.put('/shop_api/orders/:id/:stan', OrderController.updateStatusById);
router.get('/shop_api/orders/:status', OrderController.getOrders); 


// defined response for order statuses
router.get('/shop_api/status', OrderStatusController.getAll);


module.exports = router;
