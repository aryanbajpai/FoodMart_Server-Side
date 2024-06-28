//Import and Install MONGOOSE
const dotenv = require('dotenv');
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECT_DB_STR);

const vendorSchema = new mongoose.Schema({
    vendors: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
})

const vendorsModel = mongoose.model('vendors', vendorSchema);

module.exports = vendorsModel;