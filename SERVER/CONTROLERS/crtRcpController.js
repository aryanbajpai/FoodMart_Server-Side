const asyncHandler = require('express-async-handler');
const createrecipeModel = require('../CONFIG/crtReciepe.DB');
const reciepeModel = require('../CONFIG/reciepeDB');
const itemsModel = require('../CONFIG/itemsDB');
const stockModel = require('../CONFIG/stockDB');

const getCrtReciepe = asyncHandler( async(req, res) => {
    const cR = await createrecipeModel.find();
    res.json(cR);
});


const getOldRecipeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const recipe = await reciepeModel.findById(id);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the recipe' });
    }
});


const createReciepe = asyncHandler( async(req, res) => {
    const { reciepeNm, itemNm, quantity, weight } = req.body;

    if (!reciepeNm || !itemNm || !quantity || !weight) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const reciepe = await reciepeModel.findOne({ reciepeNm });
    const item = await itemsModel.findOne({ itemNm });
    const stock = await stockModel.findOne({ itemNm });

    if (!reciepe || !item) {
        res.status(400);
        throw new Error("Recipe or item not found.");
    }

    if (!stock) {
        res.status(500);
        throw new Error("Stock information not found.");
    }

    // Calculate updated stock values
    const newStockUsed = stock.stockUsed + quantity;
    const newStockRemain = stock.stockRemain - quantity;

    // Update existing stock entry
    stock.stockUsed = newStockUsed;
    stock.stockRemain = newStockRemain;

    await stock.save();

    // Create new recipe creation record
    const newCreation = createrecipeModel({
        reciepeNm,
        reciepeId: reciepe._id,
        itemNm,
        weight: item.weight,
        itemId: item._id,
        quantity,
        weight,
    });

    await newCreation.save();

    // Return response with updated data
    res.status(200).json({ newCreation, stock });

    // if( quantity > item.quantity){
    //     res.status(400);
    //     throw new Error("Low STOCK");
    // }

});

module.exports = {createReciepe, getCrtReciepe, getOldRecipeById};