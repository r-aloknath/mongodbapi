const dotenv = require("dotenv")
const mongoose = require('mongoose')
const express = require("express");
const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
dotenv.config({path:'./config.env'})
require('./db/connection')
// const User = require('./models/userSchema')
// Router linking
app.use(require('./router/auth'))
const PORT = process.env.PORT;
// middleware
const middleWare = (req, res, next) => {
    console.log(`Hello My Middleware`);
    // next();
}
middleWare();
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening on port ${PORT}`  )
})
