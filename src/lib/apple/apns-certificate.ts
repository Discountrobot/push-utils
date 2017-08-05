import * as forge from 'node-forge';

import { APNS_OIDS } from './apns-oids';
import {
  InvalidCertificateError,
  InvalidCertificateEnvError,
  InvalidPassphraseError,
  InvalidFileError,
  InvalidPrivateKeyError
} from './errors';

interface IForgeCertificate extends forge.pki.Certificate {
  getExtension (options: {});
}

export interface IApnsEnvironment {
  sandbox: boolean;
  production: boolean;
}

/**
 * ApnsCertificate
 */
export class ApnsCertificate {

  public readonly key: string;
  public readonly cert: string;
  public readonly passphrase?: string;
  public readonly environment: IApnsEnvironment;
  public readonly topic: string;
  public readonly expires: Date;

  constructor (bytes: forge.Base64, passphrase?: string) {
    const p12: forge.pkcs12.Pkcs12Pfx = this.decryptPkcs12(bytes, passphrase);

    this.passphrase = passphrase;

    const privateKey = this.getPrivateKey(p12);
    this.key = privateKey.key;

    const certificate = this.getCertificate(p12);
    this.cert = certificate.cert;
    this.topic = certificate.topic;
    this.environment = certificate.environment;
    this.expires = certificate.expires;
  }

  /**
   * Decrypts a base64 encoded PKCS#12 file into a node-forge PKCS#12 object
   */
  private decryptPkcs12 (
    bytes: forge.Base64,
    passphrase?: string
  ): forge.pkcs12.Pkcs12Pfx {
    try {
      const p12Asn1 = forge.asn1.fromDer(forge.util.decode64(bytes), false);
      let p12: forge.pkcs12.Pkcs12Pfx;
      try {
        p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, passphrase);
      } catch (err) {
        // OpenSSL certificates need an empty string as passphrase, if none was specified
        if (passphrase != null) {
          throw err;
        }
        p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, '');
      }

      return p12;
    } catch (ex) {
      const err = <Error> ex;
      if (err.message.match('Invalid password') !== null) {
        throw new InvalidPassphraseError();
      } else {
        throw new InvalidFileError();
      }
    }
  }

  /**
   * Extracts APNS relevant private key properties from a PKCS#12 object
   */
  private getPrivateKey (p12: forge.pkcs12.Pkcs12Pfx) {
    const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
    const pkcs8ShroudedKeyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag];

    if (
      pkcs8ShroudedKeyBag === undefined ||
      pkcs8ShroudedKeyBag[0] === undefined
    ) {
      throw new InvalidPrivateKeyError();
    }

    const keyBag = pkcs8ShroudedKeyBag[0];

    if (
      keyBag === null ||
      keyBag.key === null ||
      keyBag.key.n === null ||
      keyBag.key.e === null
    ) {
      throw new InvalidPrivateKeyError();
    }

    return {
      key: forge.pki.privateKeyToPem(keyBag.key)
    };
  }

  /**
   * Extracts the APNS environment from a pki certificate object
   */
  private getCertEnvironment (cert: IForgeCertificate): IApnsEnvironment {
    const environment = { sandbox: false, production: false };

    if (cert.getExtension({ id: APNS_OIDS.development }) != null) {
      environment.sandbox = true;
    }

    if (cert.getExtension({ id: APNS_OIDS.production }) != null) {
      environment.production = true;
    }

    if (
      environment.sandbox === false &&
      environment.production === false
    ) {
      throw new InvalidCertificateEnvError();
    }

    return environment;
  }

  /**
   * Extracts APNS relevant certificate properties from a PKCS#12 object
   */
  private getCertificate (cert: forge.pkcs12.Pkcs12Pfx) {
    const bags = cert.getBags({ bagType: forge.pki.oids.certBag });
    const certBags = bags[forge.pki.oids.certBag];

    if (
      certBags === undefined ||
      certBags[0] === undefined) {
      throw new InvalidCertificateError();
    }

    const certBag: forge.pkcs12.Bag = certBags[0];

    if (
      certBag === null ||
      certBag.cert === undefined ||
      certBag.cert.publicKey === undefined ||
      certBag.cert.validity === undefined ||
      certBag.cert.subject === undefined
    ) {
      throw new InvalidCertificateError();
    }

    // extract the certificate bundleId
    // tslint:disable-next-line: no-unsafe-any
    const topic: string = certBag.cert.subject.attributes[0].value;
    // extracts the certificate validity
    const expires: Date = new Date(certBag.cert.validity.notAfter.getTime());

    return {
      cert: forge.pki.certificateToPem(certBag.cert),
      environment: this.getCertEnvironment(<IForgeCertificate> certBag.cert),
      topic,
      expires
    };
  }
}
