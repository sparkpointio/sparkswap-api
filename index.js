const express = require('express')
const path = require('path')
const moment = require('moment')
const dotenv = require("dotenv")
const request = require('request')
const fs = require("fs")
const axios = require('axios')

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

app.get('/', function(req, res) {
  res.send('SparkSwap API!');
})

app.get('/api/goerli-gasprice', async function(req, res) {
  try {
    const response = await axios.get('https://api.nodereal.io/node/gasInfo');
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch data from API');
  }
})

app.get('/api/airdrop/:merkle', async function(req, res) {
  try{
    const filePath = path.join(process.cwd(), 'src', 'merkle-root-airdrop' , `${req.params.merkle}.json`);
    const file = fs.readFileSync(filePath, 'utf8');
    const merkleData = JSON.parse(file);

    res.json({"merkleRoot": merkleData.merkleRoot, "tokenTotal": merkleData.tokenTotal});
  }
  catch (e) {
    if (e.code === 'ENOENT') res.send("Merkle not found");
    else res.send(e);
  }
})

app.get('/api/airdrop/:merkle/:address', async function(req, res) {
  try{
    const filePath = path.join(process.cwd(), 'src', 'merkle-root-airdrop' , `${req.params.merkle}.json`);
    const file = fs.readFileSync(filePath, 'utf8');
    const merkleData = JSON.parse(file);

    if(typeof merkleData.claims[req.params.address] === 'undefined') throw ('Address not found');

    res.json(merkleData.claims[req.params.address]);
  }
  catch (e) {
    if (e.code === 'ENOENT') res.send("Merkle not found");
    else res.send(e);
  }
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})