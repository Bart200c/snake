// jshint esversion: 6

const express = require("express");
var cors = require('cors')

var bodyParser = require("body-parser");
const app = express();
const port =3000
app.use(
  bodyParser.json()
);
app.use(cors())

const { GlacierClient } = require('@glacier-network/client');

// glacierapps 7550908759586c421f6e4c9a5b364ad6a8102e81ced28e71240411f9a64c3711
const privateKey = process.env.GLACIER_APP_PRIVATEKEY;
const glacierGateway = process.env.GLACIER_GATEWAY;
const appns = process.env.GLACIER_APP_NS;
const client = new GlacierClient(glacierGateway, {
  privateKey,
});
let collection = client.namespace(appns).dataset('snake').collection('player')


app.use(express.static('./web'))

app.get("/", function (req, res) {
  res.send('glacier app snake');
});

app.post("/glacier/snake/score/upload", async function (req, res) {
  let { name, point, time } = req.body;
  name = name || 'unknown';
  console.log(name, point, time, req.body.name)
  let player = await collection.find({name: name}).limit(1).toArray()
  if (player.length === 0) {
    let result = await collection.insertOne(
      {
        name: name,
        point: point,
        time: time,
        create_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      }
    )
    res.send(result);
  } else {
    let result = await collection.updateOne({name: {"$eq": name}}, {
      point: point, 
      time: time,
      updated_at: new Date().getTime(),
    })
    res.send(result);
  }
});

app.get("/glacier/snake/score/top", async function (req, res) {
  let players = await collection.find().sort({'point': -1}).limit(10).toArray()
  res.send(players)
})

app.listen(port, () => console.log(`glacier app snake listening on port ${port}!`))

module.exports = app
