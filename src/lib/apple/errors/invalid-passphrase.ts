/**
 * InvalidPassphraseError
 * @class InvalidPassphraseError
 */
export class InvalidPassphraseError extends Error {

  constructor () {
    super('unable to parse certificate, incorrect passphrase');
    this.name = this.constructor.name;
  }

}
