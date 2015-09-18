// Used for local testing only
// Created to avoid Chrome's cross origin requests denial

var express = require('express');
var app = express();
var path = require('path');

// __dirname will use the current path from where you run this file 
app.use(express.static(__dirname));

app.listen(8000);

console.log("Server runnning on localhost:8000");