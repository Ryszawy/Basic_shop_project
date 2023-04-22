const OrderStatus = require('../models/orderStatus');

exports.getAll = (req, res) => {
    OrderStatus.getAll().then(
        function(allStatuses) {
            res.json(allStatuses);
        }
    )
}
