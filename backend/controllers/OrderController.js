const { knex } = require('../config/bookshelf');
const Order = require('../models/order');

exports.getAll = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    )
};

exports.store = (req, res) => {
    const newOrder = Order.create({
        'order_date': new Date(),
        'user_name': req.body.user_name,
        'email': req.body.email,
        'phone_number': req.body.phone_number
    })
    let promises = []

    newOrder.then(function(order) {
        if (!order.attributes.phone_number || !/^\d+$/.test(order.attributes.phone_number)) {
            throw new Error("Wrong phone number")
        } else if (!order.attributes.email || !order.attributes.email.match(/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/)) {
            throw new Error("Wrong email address")
        } else if (!order.attributes.user_name) {
            throw new Error("Wrong username")
        }
        req.body.order_products.forEach(order_product => {
            promises.push(Order.createProducts({
                'quantity': order_product.quantity,
                'order_id': order.attributes.id,
                'product_id': order_product.product_id
            }))
        })
        Promise.all(promises).then(function() {
            res.status(200).json({
                'message':'Order succesfully created'
            });
        }).catch((error) => {
            if (error.sql) {
                res.status(400).json({'message': error.sqlMessage});
            } else {
                res.status(400).json({'message': error.message});
            }
        })
    }).catch((error) => {
        if (error.sql) {
            res.status(400).json({'message': error.sqlMessage});
        } else {
            res.status(400).json({'message': error.message});
        }
    });
 };

 exports.updateStatusById = (req, res) => {
    knex.select('status_id', 'id').from('orders').where('id', req.params.id).then(
        function(order) {
            if (!order.length) {
                throw new Error("Order with this id doesn't exist")
            } else if (JSON.parse(JSON.stringify(order))[0].status_id >= req.params.stan ||
            JSON.parse(JSON.stringify(order))[0].status_id == 3 && req.params.stan == 4) {
                throw new Error(`Can't change to this order status`)
            } 
            Order.update(req.params.id, req.params.stan).then(
                function() {
                    res.status(200).json({'message': "Order updated"});
                }
            ).catch((error) => {
                res.status(400).json({'message': error.message});
            })
        }
    ).catch((error) => {
        res.status(400).json({'message': error.message});
    })
 };

exports.getOrders = (req, res) => {
    Order.getStatusOrders(req.params.status).then(function(allOrders) {
        res.json(allOrders)
    })
}
