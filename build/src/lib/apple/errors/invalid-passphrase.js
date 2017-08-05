"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPassphraseError extends Error {
    constructor() {
        super('unable to parse credentials, incorrect passphrase');
        this.name = this.constructor.name;
    }
}
exports.InvalidPassphraseError = InvalidPassphraseError;
//# sourceMappingURL=invalid-passphrase.js.map