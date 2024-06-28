//Imp & Ins: nodemon --save-dev  (Dev-Dependency)
//Add script to package.json for START and DEV

//Install and Import: EXPRESS
const express = require('express');
const errorHandler = require('./MIDDLEWARE/errorHandler');
const cors = require('cors');
const bodyParser = require('body-parser');
//Imp and Ins: dotenv
const dotenv = require('dotenv').config();

const app = express();

//HIGHLY IMP for using in CLIENT
app.use(cors());
app.use(bodyParser.json());

//Parse data from CLIENT
app.use(express.json());

//Use Custom Middleware
app.use(errorHandler);

//Port for Server
const port = process.env.PORT || 5000;

//Create EndPoint
app.use("/admin/vendor", require('./ROUTES/vendorsRoute'));
app.use('/admin/items', require('./ROUTES/itemsRoute'));
app.use('/admin/reciepe', require('./ROUTES/reciepeRoute'));
app.use('/admin/createReciepe', require('./ROUTES/createReciepeRoute'));
app.use('/admin/stock', require('./ROUTES/stockRoutes'));

//listen Server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})