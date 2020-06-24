const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config/config.json')
const port = process.env.port || config.port

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

mongoose.connect(config.mongoURI, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const routes = require('./routes/routes')
app.use('/api', routes)
app.listen(port, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server started listening at port ${port}`)
    }
})