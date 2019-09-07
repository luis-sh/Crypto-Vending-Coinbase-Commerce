'use strict';

const express = require("express");
const CoinbaseCommerce = require("./integrations/coinbase-commerce");

let app = express();

app.get("/coinbase-endpoint", async (req, res) => {
  let coinbaseCommerce = new CoinbaseCommerce(process.env.COINBASE_COMMERCE_API_KEY);
  coinbaseCommerce.runTest();
});

app.use((req, res) => {
  res.status(404);
  res.end("404: File Not Found");
});

module.exports = app;
