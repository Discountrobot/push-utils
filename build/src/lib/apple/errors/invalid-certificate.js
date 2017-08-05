"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCertificateError extends Error {
    constructor() {
        super('certificate is invalid');
        this.name = this.constructor.name;
    }
}
exports.InvalidCertificateError = InvalidCertificateError;
//# sourceMappingURL=invalid-certificate.js.map