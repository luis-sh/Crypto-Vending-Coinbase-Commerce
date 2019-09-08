'use strict';

const coinbase = require('coinbase-commerce-node');

const Client = coinbase.Client;
const Charge = coinbase.resources.Charge;


class CoinbaseCommerce {

  constructor(API_KEY){
    this.API_KEY = API_KEY;
    this.client = Client.init(API_KEY);
  }


  /**
   * 
   * Charge object expected:
   * 
   * {
       "name": [NAME OF CHARGE/PRODUCT - string],
       "description": [DESCRIPTION - string],
       "pricing_type": "fixed_price",
       "local_price": {
         "amount": [AMOUNT IN CURRENCY - string | number],
         "currency": ["BTC" | "USD" | "ETH" - string]
       },
       "metadata": {
         "vendor": [PARAM PRODUCT- string], //As defined within the vending machine contract
         "product": [PARAM PRODUCT - string] 
       }
     }
   *
   * For more information: https://commerce.coinbase.com/docs/api/#create-a-charge
   *
   **/
  async createCharge(chargeObj){
  
    let charge = new Charge(chargeObj);
    console.log("Uploading new charge via save...");
    const res = await charge.save();
    console.log(`Response ID: ${res.id}`);
    return res;
  }

  async runTest() {

    let obj = {
      "name": "First Charge For Fun",
      "description": "Selling some sort of thing",
      "metadata": {
        "customer_name": "anonymous hooligan"
      },
      "pricing_type": "no_price",
      "addresses": {
        "bitcoin": "mymZkiXhQNd6VWWG7VGSVdDX9bKmviti3U",
        "ethereum": "0x0000000000000000000000000000000000000000"
      }
    };

    await this.createCharge(obj);
  
  }

  async runSellTest() {

    let obj = {
      "name": "Millville Protein Chewy Bar",
      "description": "NO certified synthetic colors or synthetic preservatives",
      "pricing_type": "fixed_price",
      "local_price": {
        "amount": "2",
        "currency": "USD"
      },
      "metadata": {
        "vendor": "Anonymous Vendor",
        "product": "Millville Protein Chewy Bar"
      }
    };

    await this.createCharge(obj);
  
  }

}


module.exports = CoinbaseCommerce;
