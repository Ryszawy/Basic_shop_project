//product.js
const bookshelf= require('../config/bookshelf');

const Product = bookshelf.Model.extend({
   tableName: 'products'
});

module.exports.getAll = () => {
   return Product.fetchAll();
};

module.exports.getById = (id) => {
   return new Product({'id':id}).fetch();
};

module.exports.create = (product) => {
   return new Product({
       product_name: product.product_name,
       description: product.description,
       price: product.price,
       weight: product.weight,
       category_id: product.category_id
   }).save();
};

module.exports.update = (product) => {
   return new Product({
      id: product.id
   }).save( {
         product_name: product.product_name,
         description: product.description,
         price: product.price,
         weight: product.weight,
         category_id: product.category_id
       }, 
       {patch: true}
   );
};
