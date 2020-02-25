var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './.env' })
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_CONNECTION
const instance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json())
app.use(cors());

exports.Index = (req, res, next) => {
        instance.connect((err, client) => {
          if (err) {res.send(err)} else {
          const collection = client.db("project-database").collection("codename-words")
          collection.find().toArray().then(r => res.send(r))
        }})
      }