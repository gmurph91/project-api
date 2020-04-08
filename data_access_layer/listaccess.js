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


exports.getLists = (req, res, next) => {
        instance.connect((err, client) => {
          if (err) {res.send(err)} else {
          const collection = client.db("todolist").collection("lists")
          collection.find().toArray().then(r => res.send(r))
        }})
      }

exports.getItems = (req, res, next) => {
instance.connect((err, client) => {
    if (err) {res.send(err)} else {
    const collection = client.db("todolist").collection("items")
    collection.find().toArray().then(r => res.send(r))
}})
}


exports.createList = (req, res, next) => {
instance.connect((err, client) => {
    if (err) {res.send(err)} else {
    const collection = client.db("todolist").collection("lists")
    collection.insertOne(req.body).then(r => res.send(r.ops))
}})
}

exports.createItem = (req, res, next) => {
    instance.connect((err, client) => {
        if (err) {res.send(err)} else {
        const collection = client.db("todolist").collection("items")
        collection.insertOne(req.body).then(r => res.send(r.ops))
    }})
    }

exports.updateItem = (req, res, next) => {
    instance.connect((err, client) => {
        if (err) {res.send(err)} else {
        const collection = client.db("todolist").collection("items")
        collection.replaceOne(
        { "_id": mongodb.ObjectId(req.params.id) }, 
        req.body,
        {upsert: true}
        ).then(r => res.send(r.ops))
    }})
    }

exports.updateList = (req, res, next) => {
    instance.connect((err, client) => {
        if (err) {res.send(err)} else {
        const collection = client.db("todolist").collection("lists")
        collection.replaceOne(
        { "_id": mongodb.ObjectId(req.params.id) }, 
        req.body,
        {upsert: true}
        ).then(r => res.send(r.ops))
    }})
    }

exports.deleteItem = (req, res, next) => {
    instance.connect((err, client) => {
        if (err) {res.send(err)} else {
        const collection = client.db("todolist").collection("items")
        collection.findOneAndDelete({ "_id": mongodb.ObjectId(req.params.id) }, (error, result) => {
            if (error) {
            return res.status(500).send(error);
            }
            res.send(result);
        })      }
    })
    }

exports.deleteList = (req, res, next) => {
    instance.connect((err, client) => {
        if (err) {res.send(err)} else {
        const collection = client.db("todolist").collection("lists")
        collection.findOneAndDelete({ "_id": mongodb.ObjectId(req.params.id) }, (error, result) => {
            if (error) {
            return res.status(500).send(error);
            }
            res.send(result);
        })      }
    })
    }