const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderCollection = new Schema({
    orderId: Number,
    userId : Number,
    subTotal: Number,
    date: Date
})

module.exports = mongoose.model("orderCollection", orderCollection)