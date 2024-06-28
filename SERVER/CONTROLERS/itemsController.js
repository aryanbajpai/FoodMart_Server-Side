const asyncHandler = require("express-async-handler");
const itemsModel = require("../CONFIG/itemsDB");
const vendorsModel = require("../CONFIG/vendorsDB");
const stockModel = require("../CONFIG/stockDB");

const getItems = asyncHandler( async (req, res) => {
    const item = await itemsModel.find().populate('vendorID').exec();
    res.json(item)
})

const addItems = asyncHandler( async (req, res) => {
    const {vendorNm, itemNm, quantity, weight} = req.body;

    const vendor = await vendorsModel.findOne({ vendors: vendorNm });
    if (!vendor) {
        res.status(400);
        throw new Error("Vendor not found.");
    }

    const newItems = itemsModel({
        vendorNm,
        itemNm,
        quantity,
        weight,
        vendorID: vendor._id,
    })

    if(!vendorNm || !itemNm || !quantity || !weight){
        res.status(400);
        throw new Error("All fields are mandetory.")
    }

    await newItems.save();

    const newStock = stockModel({
        itemNm,
        itemId: newItems._id,
        stockBuyed: quantity,
        weight,
        stockUsed: 0,
        stockRemain: quantity,
    })

    await newStock.save();
    res.status(200).json({newItems, newStock});
})

module.exports = {getItems, addItems};