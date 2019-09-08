# Crypto Vending Machine
## Coinbase Commerce Server
The Coinbase Commerce integration for the Crypto Vending Machine project for ETHBoston. This application is meant to run on a public-facing server (e.g. a VPS), which will serve as the host of an endpoint Coinbase Commerce will contact on each event relating to the charge lifecycle.

The server is powered by Express, and depends on a `.env` for certain server-specific configuration.

## Overview

## Configuration

Configuration is fairly simple. The application relies on `dotenv`, so fill out the following in the root directory of the project:

`.env`:

```
# Server configuration


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

Coinbase Commerce requires SSL for the endpoint, which (to our understanding) requires a domain. The current configuration was produced via Let's Encrypt's `certbot`, which generates a certificate at a particular location. The privat key, certificate, and CA must be re-configured

## Running
Running the server is simple, just run:
  * `npm run start`

## Notes
