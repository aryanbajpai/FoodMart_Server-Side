const asyncHandler = require('express-async-handler');
const stockModel = require('../CONFIG/stockDB');
// const itemsModel = require('../CONFIG/itemsDB');
// const createRecipeModel = require('../CONFIG/crtReciepe.DB');

const getStock = asyncHandler( async(req, res) => {
    const stocks = await stockModel.find();
    // console.log("STOCK -> ", stocks);
    res.json(stocks);
});



module.exports = {getStock};