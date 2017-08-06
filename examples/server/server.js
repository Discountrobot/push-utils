const fs = require('fs');
const path = require('path');
const ApnsCertificate =  require('../../build/src').ApnsCertificate;

const P12_BASE64 = fs.readFileSync(
  path.resolve(__dirname, 'cert.p12')
).toString('base64');

const passphrase = undefined;

try {
  const certificate = new ApnsCertificate(P12_BASE64, passphrase);
  console.log(certificate);
} catch (err) {
  console.error(err.name, err.message);
}
