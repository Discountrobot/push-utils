/**
 * InvalidPrivateKeyError
 * @class InvalidPrivateKeyError
 */
export class InvalidPrivateKeyError extends Error {

  constructor () {
    super('private key is invalid');
    this.name = this.constructor.name;
  }

}
