const Product = require('../models/product');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
 };
 
 exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    ).catch((error) => {
        res.send(error);
    })
 };
 
 exports.store = (req, res) => {
    if (req.body.product_name === '' || req.body.product_name.length < 3) {
        res.status(400).json({'message': "Valid product name is needed"})
    } else if (req.body.description === '' || req.body.description.length < 5) {
        res.status(400).json({'message': "Valid description is needed"})
    } else if (req.body.price === null || req.body.price <= 0 || !req.body.price) {
        res.status(400).json({'message': "Valid price is needed"})
    } else if (req.body.weight === null || req.body.weight <= 0 || !req.body.price ) {
        res.status(400).json({'message': "Valid weight is needed"})
    } else if (!req.body.category_id) {
        res.status(400).json({'message': 'This category is incorrect'})
    } else {
        Product.create({
            'product_name': req.body.product_name,
            'description': req.body.description,
            'price': req.body.price,
            'weight': req.body.weight,
            'category_id': req.body.category_id
        }).then(function() {
            res.status(200).json({
                'message': 'Product created'
            });
        }).catch((error) => {
            if (error.sql) {
                res.status(400).json({'message': error.sqlMessage});
            } else {
                res.status(400).json({'message': error.message});
            }
        });
    }    
 };
 
 exports.updateById = (req, res) => {
    if (!req.body.product_name && !req.body.description && req.body.price == null
         && req.body.price !== 0 && req.body.weight == null && req.body.weight !== 0 && !req.body.category_id) {
        res.status(400).json({'message': "You didn't input any data"})
    } else if (req.body.product_name && req.body.product_name.length < 3) {
        res.status(400).json({'message': "Product name should be longer than " + req.body.product_name.length})
    } else if (req.body.description && req.body.description.length < 5) {
        res.status(400).json({'message': "Description should be longer than " + req.body.description.length})
    } else if (req.body.price <= 0) {
        res.status(400).json({'message': "Price can't be lower or equal than 0"})
    } else if (req.body.weight <= 0) {
        res.status(400).json({'message': "Weight can't be lower or equal than 0"})
    } else {
        Product.update(req.body).then (() => {
            res.status(200).json({'message': 'Product succesfully updated'});   
        }
        ).catch((error) => {
            res.status(400).json({'message': error.message});
        })
    }
}