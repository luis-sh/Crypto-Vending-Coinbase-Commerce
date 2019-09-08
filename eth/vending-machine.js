
class VendingMachine {

  /**
   * Contract object should have:
   *   -abi
   *   -address
   *
   **/

  constructor(web3, contract, accounts) {
    this.web3 = web3;
    this.contract = contract;
    this.accounts = accounts;
  }

  static async build(web3, contract) {
    let accounts = await web3.eth.getAccounts();
    let web3Contract = new web3.eth.Contract(abi, address);

    return new VendingMachine(web3, web3Contract, accounts);
  }

  /**
   * We're going to be lazy here and assume the first account is the correct one lolol
   *
   **/
  async verifyCoinbasePurchase(/*string*/ vendor, /*string*/ product, /*string - address*/ sender = this.accounts[0]) {
    let accounts = await web3.eth.getAccounts();
    const res = await this.contract.methods.backendPurchaseProduct(vendor, product).send({ from: sender });
    return res;
  }

}
