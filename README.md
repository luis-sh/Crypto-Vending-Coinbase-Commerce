# Crypto Vending Machine 🍫
## Coinbase Commerce Server
The Coinbase Commerce integration for the Crypto Vending Machine project for ETHBoston. This application is meant to run on a public-facing server (e.g. a VPS), which will serve as the host of an endpoint Coinbase Commerce will contact on each event relating to the charge lifecycle.

The server is powered by Express, and depends on a `.env` for certain server-specific configuration. As it is set up as of now, the application will run on port `8000`, exposing an endpoint at `/coinbase-endpoint`; therefore, it should ultimately look like: 

```
https://[DOMAIN_NAME]:8000/coinbase-endpoint
```

The server is currently hard-coded to use the Ropsten Ethereum test network (needs refactoring down the line)

## Configuration

Configuration is fairly simple. The application relies on `dotenv`, so fill out the following in the root directory of the project:

##### .env

```
# Server configuration
SSL_PRIVATE_KEY=[ssl-private-key-filepath]
SSL_CERTIFICATE=[ssl-certificate-filepath]
SSL_CA=[ssl-ca-filepath]

# Web3
MNEMONIC=[12-word-mnemonic]
INFURA_KEY=[infura-key]

# Vending Machine Smart Contracts
VENDING_MACHINE_ABI=[json-abi]
VENDING_MACHINE_ADDRESSES=[json-locations-mapped-to-contract-addresses]
# Example: '{"South Station, MA": "0x0e302nf78438r43", "Harvard, MA": "0x8e723hf87378wq"}'

# Coinbase Commerce
COINBASE_COMMERCE_API_KEY=[api-key]
```

Coinbase Commerce requires SSL for the endpoint, which (to our understanding) requires a domain. The current configuration was produced via Let's Encrypt's `certbot`, which generates a certificate at a particular location. The private key, certificate, and CA will need to be generated and placed within the config as shown above.

## Running
Running the server is simple, just run:
  * `npm run start`

## Testing

A nice test CURL query to run against the server:
```
curl -d '{
  "event": {
    "id": "24934862-d980-46cb-9402-43c81b0cdba6",
    "resource": "event",
    "type": "charge:pending",
    "api_version": "2018-03-22",
    "created_at": "2017-01-31T20:49:02Z",
    "data": {
      "code": "66BEOV2A",
      "name": "Coca-Cola",
      "description": "Purchase of a Classic can of Coca-Cola",
      "hosted_url": "https://commerce.coinbase.com/charges/66BEOV2A",
      "created_at": "2017-01-31T20:49:02Z",
      "expires_at": "2017-01-31T21:49:02Z",
      "timeline": [
        {
          "time": "2017-01-31T20:49:02Z",
          "status": "NEW"
        }
      ],
      "metadata": {
        "vendor": "coca-cola",
        "product": "classic",
        "location": "machine1"
      },
      "pricing_type": "no_price",
      "payments": [],
      "addresses": {
        "bitcoin": "mymZkiXhQNd6VWWG7VGSVdDX9bKmviti3U",
        "ethereum": "0x419f91df39951fd4e8acc8f1874b01c0c78ceba6"
      }
    }
  }
}' -H "Content-Type: application/json" -X POST https://cryptovendingmachine.xyz:8000/coinbase-endpoint
```

If the server prints the transaction, then you know you should be good!

## Notes

Within the `integrations` folder is a class `CoinbaseCommerce` (coinbase-commerce.js), which is intended to abstract away Coinbase Commerce in the context of the Vending Machine project. Simply copying and pasting this while stripping the test functions would be great for things such as UIs which want to create charges. All that is needed is to pass an API key to the object, and call `createCharge` while passing an object with the documented parameters, also listed below:
```
     {
       "name": [NAME OF CHARGE/PRODUCT - string],
       "description": [DESCRIPTION - string],
       "pricing_type": "fixed_price",
       "local_price": {
         "amount": [AMOUNT IN CURRENCY - string | number],
         "currency": ["BTC" | "USD" | "ETH" - string]
       },
       "metadata": {
         "vendor": [PARAM PRODUCT - string], //As defined within the vending machine contract
         "product": [PARAM PRODUCT - string],
         "location": [string]
       }
     }
```

It's important for the metadata to mirror the values found within the smart contract precisely, as the server will receive this metadata and use it to determine which product it should mark as paid on the `VendingMachine` contract.
