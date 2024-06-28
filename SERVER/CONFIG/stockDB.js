const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.connect(process.env.CONNECT_DB_STR);
dotenv.config();

const stockSchema = new mongoose.Schema({
    itemNm: {
        type: String,
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
        required: true,
    },
    stockBuyed: {
        type: Number,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    stockUsed: {
        type: Number,
        required: true,
    },
    stockRemain: {
        type: Number,
        required: true,
    },
});

const stockModel = mongoose.model('stock', stockSchema);

module.exports = stockModel;