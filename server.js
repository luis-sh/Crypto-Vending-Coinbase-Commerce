'use strict';

const express = require("express");
const CoinbaseCommerce = require("./integrations/coinbase-commerce");
const Util = require("./util/util");

const app = express();

app.use(express.json());

app.post("/coinbase-endpoint", async (req, res, next) => {
  console.log("BIGCOCKC");
  if(Util.objectIsEmpty(req.body)) { 
    next();
    return;
  }

    console.log(req.body);
  const ev = req.body.event;
  if (ev.type === "charge:created") {
    console.log(`Charge created! Data: ${JSON.parse(JSON.stringify(req.query))}`);
    res.status(200).send();
  } else if (ev.type === "charge:pending") {
    console.log(`Charge pending! Data: ${JSON.parse(JSON.stringify(req.query))}`);
    res.status(200).send();
  } else if (ev.type === "charge:failed") {
    //To some extent, we are failing silently
    console.log(`Charge Failed! Data: ${JSON.parse(JSON.stringify(req.query))}`);
    res.status(200).send();
  } else {
    console.log(`An event other than creation, pending, and failure has been called: ${JSON.parse(JSON.stringify(req.query))}`);
    res.status(200).send();
  }
});

app.post("/coinbase-endpoint-test", async (req, res) => {
  let coinbaseCommerce = new CoinbaseCommerce(process.env.COINBASE_COMMERCE_API_KEY);
  coinbaseCommerce.runTest();
});

app.use((req, res) => {
  res.status(404);
  res.end("404: File Not Found");
});

module.exports = app;
