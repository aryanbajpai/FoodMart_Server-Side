const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECT_DB_STR);

const reciepeSchema = new mongoose.Schema({
    reciepeNm: {
        type: String,
        required: true,
    },
})

const reciepeModel = mongoose.model('reciepes', reciepeSchema);

module.exports = reciepeModel;