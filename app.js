'use strict';

const fs = require("fs");
const http = require("http");
const https = require("https");

const app = require('./server.js');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/cryptovendingmachine.xyz/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/cryptovendingmachine.xyz/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/cryptovendingmachine.xyz/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

console.log(JSON.parse(JSON.stringify(credentials)));
https.createServer(credentials, app).listen(8000);
