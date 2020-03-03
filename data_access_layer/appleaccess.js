var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './.env' })
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_CONNECTION
const instance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const webSocketsServerPort = process.env.REACT_WS_PORT || 8080;
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();

server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
})

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

    