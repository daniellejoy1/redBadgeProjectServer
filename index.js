require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
// const cors = require("cors");
const sequelize = require('./db');
const user = require('./controllers/userController');
const clients = require('./controllers/clientController');
const quotes = require('./controllers/quoteController');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(cors())
app.use(express.json());
app.use('/user', user);
app.use('/clients', clients);
app.use('/quotes', quotes)

		
app.listen(process.env.PORT,()=> console.log(`Listening on port ${process.env.PORT}`));

module.exports = app;