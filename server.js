'use strict';

const express = require("express");

let app = express();

app.get("/coinbase-endpoint", (req, res) => {
  
  
});

app.use(function(req, res){
   res.status(404);
   res.end("404: File Not Found");
});

module.exports = app;
