/**
 * InvalidCertificateError
 * @class InvalidCertificateError
 */
export class InvalidCertificateError extends Error {

  constructor () {
    super('certificate is invalid');
    this.name = this.constructor.name;
  }

}
