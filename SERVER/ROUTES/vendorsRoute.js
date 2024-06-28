const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const { getVendors } = require("../CONTROLERS/vendorsController");
const vendorsModel = require("../CONFIG/vendorsDB");

//Configure Routes
router.route('/').get(getVendors);
router.route('/').post(asyncHandler( async (req, res) => {
    //Parse data from CLIENT
    console.log("Request Body: ", req.body);
    //De-structure the Data from client
    const {vendors, phone} = req.body;

    //Add the Client data to DB Schema
    const newVendor = vendorsModel({
        vendors: vendors,
        phone: phone,
    })

    if(!vendors || !phone){
        res.status(400);
        throw new Error("All fields are mandetory.")
    }

    await newVendor.save();
    res.status(200).json(newVendor)
}))

module.exports = router;