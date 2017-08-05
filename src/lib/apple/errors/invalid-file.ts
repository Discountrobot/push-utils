/**
 * InvalidFileError
 * @class InvalidFileError
 */
export class InvalidFileError extends Error {

  constructor () {
    super('unable to parse credentials, not a PFX/P12 file');
    this.name = this.constructor.name;
  }

}
