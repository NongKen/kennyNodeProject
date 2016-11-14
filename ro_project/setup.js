express = require('express')
app = express();

mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ragnarok')

bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))