const express = require('express');
const { createReciepe, getCrtReciepe, getOldRecipeById } = require('../CONTROLERS/crtRcpController');
const router = express.Router();

router.route('/').get(getCrtReciepe);
router.route('/').post(createReciepe);
router.route('/:id').get(getOldRecipeById);

module.exports = router;