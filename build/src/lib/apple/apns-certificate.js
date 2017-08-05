"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge = require("node-forge");
const apns_oids_1 = require("./apns-oids");
const errors_1 = require("./errors");
class ApnsCertificate {
    constructor(bytes, passphrase) {
        const p12 = this.decryptPkcs12(bytes, passphrase);
        this.passphrase = passphrase;
        const privateKey = this.getPrivateKey(p12);
        this.key = privateKey.key;
        const certificate = this.getCertificate(p12);
        this.cert = certificate.cert;
        this.topic = certificate.topic;
        this.environment = certificate.environment;
        this.expires = certificate.expires;
    }
    decryptPkcs12(bytes, passphrase) {
        try {
            const p12Asn1 = forge.asn1.fromDer(forge.util.decode64(bytes), false);
            let p12;
            try {
                p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, passphrase);
            }
            catch (err) {
                if (passphrase != null) {
                    throw err;
                }
                p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, '');
            }
            return p12;
        }
        catch (ex) {
            const err = ex;
            if (err.message.match('Invalid password') !== null) {
                throw new errors_1.InvalidPassphraseError();
            }
            else {
                throw new errors_1.InvalidFileError();
            }
        }
    }
    getPrivateKey(p12) {
        const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
        const pkcs8ShroudedKeyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag];
        if (pkcs8ShroudedKeyBag === undefined ||
            pkcs8ShroudedKeyBag[0] === undefined) {
            throw new errors_1.InvalidPrivateKeyError();
        }
        const keyBag = pkcs8ShroudedKeyBag[0];
        if (keyBag === null ||
            keyBag.key === null ||
            keyBag.key.n === null ||
            keyBag.key.e === null) {
            throw new errors_1.InvalidPrivateKeyError();
        }
        return {
            key: forge.pki.privateKeyToPem(keyBag.key)
        };
    }
    getCertEnvironment(cert) {
        const environment = { sandbox: false, production: false };
        if (cert.getExtension({ id: apns_oids_1.APNS_OIDS.development }) != null) {
            environment.sandbox = true;
        }
        if (cert.getExtension({ id: apns_oids_1.APNS_OIDS.production }) != null) {
            environment.production = true;
        }
        if (environment.sandbox === false &&
            environment.production === false) {
            throw new errors_1.InvalidCertificateEnvError();
        }
        return environment;
    }
    getCertificate(cert) {
        const bags = cert.getBags({ bagType: forge.pki.oids.certBag });
        const certBags = bags[forge.pki.oids.certBag];
        if (certBags === undefined ||
            certBags[0] === undefined) {
            throw new errors_1.InvalidCertificateError();
        }
        const certBag = certBags[0];
        if (certBag === null ||
            certBag.cert === undefined ||
            certBag.cert.publicKey === undefined ||
            certBag.cert.validity === undefined ||
            certBag.cert.subject === undefined) {
            throw new errors_1.InvalidCertificateError();
        }
        const topic = certBag.cert.subject.attributes[0].value;
        const expires = new Date(certBag.cert.validity.notAfter.getTime());
        return {
            cert: forge.pki.certificateToPem(certBag.cert),
            environment: this.getCertEnvironment(certBag.cert),
            topic,
            expires
        };
    }
}
exports.ApnsCertificate = ApnsCertificate;
//# sourceMappingURL=apns-certificate.js.map