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


http.createServer(app).listen(80);
https.createServer(credentials, app).listen(443);
