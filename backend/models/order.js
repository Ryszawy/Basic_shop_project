//order.js
const bookshelf = require('../config/bookshelf');
const _ = require('underscore');

const Order = bookshelf.Model.extend({
   tableName: 'orders',
   order_products: function() {
    return this.hasMany(OrderProducts, 'order_id')
   }
})

const OrderProducts = bookshelf.Model.extend({
    tableName: 'order_lists'
})

module.exports.getAll = () => {
    return Order.fetchAll({
        withRelated: [{
            'order_products': function(qb) {
                qb.select('order_id', 'product_id', 'quantity');
            }
        }]
    })
};

module.exports.create = (order) => {
    return new Order({
        order_date: order.order_date,
        user_name: order.user_name,
        email: order.email,
        phone_number: order.phone_number
    }).save();
};

module.exports.createProducts = (order_products) => {
    return new OrderProducts({
        quantity: order_products.quantity,
        order_id:  order_products.order_id,
        product_id: order_products.product_id
    }).save();
}


module.exports.update = (id, status_id) => {
    return new Order({
        id: id
    }).save({
        status_id: status_id,
        },
        {path: true}
    )
};


module.exports.getStatusOrders = (status) => {
    return new Order().query(qb => {
        qb.where('status_id', status)
    }).fetchAll({
        withRelated: [{
            'order_products': function(qb) {
                qb.select('order_id', 'product_id', 'quantity');
            }
        }]
    })
 }