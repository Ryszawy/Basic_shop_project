const Category = require('../models/category');

exports.getAll = (req, res) => {
    Category.getAll().then(
        function(allCategories) {
            res.json(allCategories);
        }
    )
}

