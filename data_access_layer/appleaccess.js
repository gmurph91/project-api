var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './.env' })
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_CONNECTION
const instance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(bodyParser.json());


exports.Green = (req, res, next) => {
        instance.connect((err, client) => {
          if (err) {res.send(err)} else {
          const collection = client.db("project-database").collection("apples-green")
          collection.find().toArray().then(r => res.send(r))
        }})
      }

      exports.Red = (req, res, next) => {
        instance.connect((err, client) => {
          if (err) {res.send(err)} else {
          const collection = client.db("project-database").collection("apples-red")
          collection.find().toArray().then(r => res.send(r))
        }})
      }

      exports.Creategame = (req, res, next) => {
        instance.connect((err, client) => {
          if (err) {res.send(err)} else {
          const collection = client.db("project-database").collection("apples-games")
          collection.insertOne(req.body).then(r => res.send(r.ops))
        }})
      }

      exports.Findgame = (req, res, next) => {
        instance.connect((err, client) => {
          if (err) res.send(err)
          const collection = client.db("project-database").collection("apples-games")
          collection.findOne({ "joinCode": req.params.joinCode }, (error, result) => {
            if (error) {
              return res.status(500).send(error);
            }
            res.send(result);
          })
        })
        
      }

      exports.Update = (req, res, next) => {
        instance.connect((err, client) => {
          if (err) {res.send(err)} else {
          const collection = client.db("project-database").collection("apples-games")
          collection.replaceOne(
            { "joinCode": req.params.joinCode }, 
            req.body,
            {upsert: true}
          ).then(r => res.send(r.ops))
        }})
      }