/**
 * InvalidPrivateKeyError
 * @class InvalidPrivateKeyError
 */
export class InvalidPrivateKeyError extends Error {

  constructor () {
    super('unable to parse certificate, private key is invalid');
    this.name = this.constructor.name;
  }

}
