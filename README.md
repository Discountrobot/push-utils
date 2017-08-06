[![Build Status](https://travis-ci.org/Discountrobot/push-utils.svg?branch=master)](https://travis-ci.org/Discountrobot/push-utils)
[![Coverage Status](https://coveralls.io/repos/github/Discountrobot/push-utils/badge.svg?branch=master)](https://coveralls.io/github/Discountrobot/push-utils?branch=master)

# Push utils

A javascript library for parsing & validating APNS (Apple Push Notification Service) PKCS#12 certificates.

## Motivation

The purpose of the library is to handle changes to / addition of APNS certificates during runtime of services handling multiple certificates at once.

And throws understandable messages given erroneous certificates.

It can be used both client and server side.

## Usage

### Node.js

```javascript
const fs = require('fs');
const path = require('path');
const ApnsCertificate =  require('../../build/src').ApnsCertificate;

const P12_BASE64 = fs.readFileSync('cert.p12').toString('base64');
const passphrase = 'passphrase if any';
const certificate = new ApnsCertificate(P12_BASE64, passphrase);

console.log(JSON.stringify(certificate, undefined, 4));
```

Which will output

```json
{
  "key": "-----BEGIN RSA PRIVATE KEY----- ... -----END RSA PRIVATE KEY-----",
  "cert": "-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----",
  "topic": "dk.discountrobot.push",
  "environment": {
    "sandbox": true,
    "production": false
  },
  "expires": "2018-08-05T20:34:44.000Z"
}
```

### Browser

For client side use, the [node-forge](https://github.com/digitalbazaar/forge) dependency must resolved during transpilation.

See the [examples](examples) for more information
