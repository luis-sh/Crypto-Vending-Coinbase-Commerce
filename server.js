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
  if(Util.objectIsEmpty(req.body.event)) {
    let err = `Malformed request received; Data: ${JSON.stringify(req.body)}`;
    console.log(err);

    res.status(403).send(err);
    return;
  }
  const ev = req.body.event;
  if (ev.type === "charge:created") {
    console.log(`Charge created! Data: ${JSON.stringify(req.body)}`);
    res.status(200).send();
  } else if (ev.type === "charge:pending") {
    console.log(`Charge pending! Data: ${JSON.stringify(req.body)}`);
    res.status(200).send();
  } else if (ev.type === "charge:failed") {
    //To some extent, we are failing silently
    console.log(`Charge Failed! Data: ${JSON.stringify(req.body)}`);
    res.status(200).send();
  } else {
    console.log(`An event other than creation, pending, and failure has been called: ${JSON.stringify(req.body)}`);
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
