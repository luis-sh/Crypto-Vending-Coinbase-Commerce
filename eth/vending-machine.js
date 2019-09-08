
class VendingMachine {

  /**
   * Contract object should have:
   *   -abi
   *   -address
   *
   **/

  constructor(web3, contract, /*accounts*/) {
    this.web3 = web3;
    this.contract = contract;
//    this.accounts = accounts;
  }

  static async build(web3, contract) {
    let accounts = await web3.eth.getAccounts();
    console.log("xx" + accounts);
    let web3Contract = new web3.eth.Contract(contract.abi, contract.address);

    return new VendingMachine(web3, web3Contract/*, accounts*/);
  }

  /**
   * We're going to be lazy here and assume the first account is the correct one lolol
   *
   **/
  async verifyCoinbasePurchase(/*string*/ vendor, /*string*/ product, /*string - address*/ /*sender = this.accounts[0]*/) {
    let acc = this.web3.eth.accounts.privateKeyToAccount("0x" + process.env.PRIVATE_KEY);
    console.log(acc)
    const res = await this.contract.methods.backendPurchaseProduct(vendor, product).send({ 'from': acc.address });
    return res;
  }

}

module.exports = VendingMachine;
