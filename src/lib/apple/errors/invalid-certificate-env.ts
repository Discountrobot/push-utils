/**
 * InvalidCertificateEnvError
 * @class InvalidCertificateEnvError
 */
export class InvalidCertificateEnvError extends Error {

  constructor () {
    super('unable to parse certificate, does not contain apns properties');
    this.name = this.constructor.name;
  }

}
