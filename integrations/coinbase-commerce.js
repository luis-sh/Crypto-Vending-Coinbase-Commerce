'use strict';

const coinbase = require('coinbase-commerce-node');

const Client = coinbase.Client;
const Charge = coinbase.resources.Charge;


class CoinbaseCommerce {

  constructor(API_KEY){
    this.API_KEY = API_KEY;
    this.client = Client.init(API_KEY);
  }

}


module.exports = CoinbaseCommerce;
