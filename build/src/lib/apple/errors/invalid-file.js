"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidFileError extends Error {
    constructor() {
        super('unable to parse certificate, not a PFX/P12 file');
        this.name = this.constructor.name;
    }
}
exports.InvalidFileError = InvalidFileError;
//# sourceMappingURL=invalid-file.js.map