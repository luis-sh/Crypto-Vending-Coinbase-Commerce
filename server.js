'use strict';

const express = require("express");
const CoinbaseCommerce = require("./integrations/coinbase-commerce");
const Util = require("./util/util");

const app = express();

app.get("/coinbase-endpoint", async (req, res, next) => {

  if(Util.objectIsEmpty(req.query)) { 
    next();
    return;
  }

  const ev = req.query.event;
  if (ev.type === "charge:created") {
    console.log(`Charge created! Data: ${JSON.parse(JSON.stringify(req.query))}`);
  } else if (ev.type === "charge:pending") {
    console.log(`Charge pending! Data: ${JSON.parse(JSON.stringify(req.query))}`);
  } else if (ev.type === "charge:failed") {
    //To some extent, we are failing silently
    console.log(`Charge Failed! Data: ${JSON.parse(JSON.stringify(req.query))}`);
  } else {
    console.log(`An event other than creation, pending, and failure has been called: ${JSON.parse(JSON.stringify(req.query))}`);
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
