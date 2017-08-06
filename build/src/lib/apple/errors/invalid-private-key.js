"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPrivateKeyError extends Error {
    constructor() {
        super('unable to parse certificate, private key is invalid');
        this.name = this.constructor.name;
    }
}
exports.InvalidPrivateKeyError = InvalidPrivateKeyError;
//# sourceMappingURL=invalid-private-key.js.map