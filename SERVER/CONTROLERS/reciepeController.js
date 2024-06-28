const asyncHandler = require('express-async-handler');
const reciepeModel = require('../CONFIG/reciepeDB');

const getRecipe = asyncHandler( async (req, res) => {
    const newReciepe = await reciepeModel.find();
    console.log("RECIEPE -> ", newReciepe);
    res.json(newReciepe)
});


const getRecipeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
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


const addRecipe = asyncHandler( async (req, res) => {
    const {reciepeNm} = req.body;

    if(!reciepeNm){
        res.status(404);
        throw new Error("Reciepe name not found!");
    }

    const newReciepe = reciepeModel({
        reciepeNm,
    });

    await newReciepe.save();
    res.status(201).json(newReciepe)
});

module.exports = {getRecipe, getRecipeById, addRecipe};