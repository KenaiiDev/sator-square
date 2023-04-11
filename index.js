//import dependencies
const express = require('express');

//config
require('dotenv').config();
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes setup
app.use('/api/sator', require('./routes/sator.routes'));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));