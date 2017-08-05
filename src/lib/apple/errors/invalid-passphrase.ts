/**
 * InvalidPassphraseError
 * @class InvalidPassphraseError
 */
export class InvalidPassphraseError extends Error {

  constructor () {
    super('unable to parse credentials, incorrect passphrase');
    this.name = this.constructor.name;
  }

}
