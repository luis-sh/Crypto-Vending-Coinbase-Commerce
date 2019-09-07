'use strict';

const express = require("express");
const CoinbaseCommerce = require("./integrations/coinbase-commerce");

const app = express();

app.get("/coinbase-endpoint", async (req, res, next) => {
  if(!req.query) { next(); }

  const ev = req.query.event;
  if(ev.type === "charge:pending") {
    console.log(`Charge pending! Data: ${JSON.parse(JSON.stringify(req.query))}`);
  
  } else if (ev.type === "charge:failed") {
    //To some extent, we are failing silently
    console.log(`Charge Failed! Data: ${JSON.parse(JSON.stringify(req.query))}`);
  }
});

app.get("/coinbase-endpoint-test", async (req, res) => {
  let coinbaseCommerce = new CoinbaseCommerce(process.env.COINBASE_COMMERCE_API_KEY);
  coinbaseCommerce.runTest();
});

app.use((req, res) => {
  res.status(404);
  res.end("404: File Not Found");
});

module.exports = app;
