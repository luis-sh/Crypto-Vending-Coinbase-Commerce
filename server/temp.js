'use strict';
require('dotenv').config()
const CoinbaseCommerce = require("../integrations/coinbase-commerce");
const Util = require("../util/util");

/**
 *  Web3 setup stuff
 *
 **/

const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = () => { 
  return new HDWalletProvider(
    process.env.PRIVATE_KEY, 
    `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
    0,
    10
  )
};
const web3 = new Web3(provider);
const VendingMachine = require('../eth/vending-machine');


const run = async () => {
  //  Uses .env and assumes it is a JSON string
/*  const accounts = await web3.eth.getAccounts();
  console.log(accounts)*/
  const addresses = JSON.parse(process.env.VENDING_MACHINE_ADDRESSES);
  const keys = Object.keys(addresses);

  let contractAddress = "";
  for(let i = 0; i < keys.length; i++) {
    if(keys[i] === "machine1") {
      contractAddress = addresses[keys[i]];
    }
  }

  console.log("contractAddr: " + contractAddress);
  if(contractAddress === "") {
    console.log('ALERT ALERT EMPTY STRONG');
  }
    
  //Logic for sending the darn thing
  const vendingMachine = await VendingMachine.build(
    web3, 
    {
      abi: JSON.parse(process.env.VENDING_MACHINE_ABI),
      address: contractAddress
    }
  );

  /* IDEA - GET THIS FROM METADATA FROM COINBASE */
  //event.data.metadata.[THING]
  const contractRes = await vendingMachine.verifyCoinbasePurchase("coca-cola", "classic");
  console.log(contractRes)


}

run();
