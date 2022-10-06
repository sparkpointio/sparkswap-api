const express = require('express')
const path = require('path')
const moment = require('moment')
const dotenv = require("dotenv")
const request = require('request')
const fs = require("fs")

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.send('SparkSwap API!');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})