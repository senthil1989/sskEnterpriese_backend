const Seller = require('../models/seller');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
    console.log('seller: ', req.body);
 
    const seller = new Seller(req.body);
    seller.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};