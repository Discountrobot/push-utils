/**
 * InvalidCertificateEnvError
 * @class InvalidCertificateEnvError
 */
export class InvalidCertificateEnvError extends Error {

  constructor () {
    super('certificate is neither production or development');
    this.name = this.constructor.name;
  }

}
