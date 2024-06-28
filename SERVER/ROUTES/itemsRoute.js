const express = require('express');
const { getItems, addItems } = require('../CONTROLERS/itemsController');
const router = express.Router();

router.route('/').get(getItems);
router.route('/').post(addItems);

module.exports = router;