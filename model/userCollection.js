const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userCollection = new Schema({
    userId : Number,
    name : String,
    noOfOrders: Number
})

module.exports = mongoose.model("userCollection", userCollection)