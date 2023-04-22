const bookshelf = require('../config/bookshelf')

const OrderStatus = bookshelf.Model.extend({
    tableName: 'order_statuses'
 });
 
 module.exports.getAll = () => {
    return OrderStatus.fetchAll();
};