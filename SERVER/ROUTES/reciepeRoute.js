const express = require('express');
const { getRecipe, addRecipe, getRecipeById } = require('../CONTROLERS/reciepeController');
const router = express.Router();

router.route('/').get(getRecipe);
router.route('/').post(addRecipe);
router.route('/:id').get(getRecipeById);

module.exports = router;