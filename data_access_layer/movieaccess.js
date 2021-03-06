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
          const collection = client.db("project-database").collection("movies")
          collection.find().toArray().then(r => res.send(r))
        }})
      }

  exports.Create = (req, res, next) => {
    instance.connect((err, client) => {
      if (err) {res.send(err)} else {
      const collection = client.db("project-database").collection("movies")
      collection.insertOne(req.body).then(r => res.send(r.ops))
    }})
  }

  exports.Destroy = (req, res, next) => {
    instance.connect((err, client) => {
      if (err) {res.send(err)} else {
        const collection = client.db("project-database").collection("movies")
        collection.findOneAndDelete({ "_id": mongodb.ObjectId(req.params.id) }, (error, result) => {
          if (error) {
            return res.status(500).send(error);
          }
          res.send(result);
        })      }
    })
  }

  exports.Update = (req, res, next) => {
    instance.connect((err, client) => {
      if (err) {res.send(err)} else {
      const collection = client.db("project-database").collection("movies")
      collection.replaceOne(
        { "_id": mongodb.ObjectId(req.params.id) }, 
        req.body,
        {upsert: true}
      ).then(r => res.send(r.ops))
    }})
  }