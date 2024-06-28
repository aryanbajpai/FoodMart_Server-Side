const express = require('express');
const {getStock, updateStock} = require('../CONTROLERS/stockController');
const router = express.Router();

router.route('/').get(getStock);

module.exports = router;