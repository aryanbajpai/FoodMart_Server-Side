const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECT_DB_STR);
dotenv.config();

const createReciepeSchema = new mongoose.Schema({
    reciepeNm: {
        type: String,
        required: true,
    },
    reciepeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reciepes',
        required: true,
    },
    itemNm: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
});

const createrecipeModel = mongoose.model('createReciepe', createReciepeSchema);

module.exports = createrecipeModel;