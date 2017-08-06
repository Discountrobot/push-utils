/**
 * InvalidCertificateError
 * @class InvalidCertificateError
 */
export class InvalidCertificateError extends Error {

  constructor () {
    super('unable to parse certificate, certificate is invalid');
    this.name = this.constructor.name;
  }

}
