const asyncHandler = require("express-async-handler");
const vendorsModel = require("../CONFIG/vendorsDB");

const getVendors = asyncHandler( async (req, res) => {
    const vendors = await vendorsModel.find();
    console.log("Vendors: ", vendors);
    res.status(200).json(vendors)
})

module.exports = {getVendors};