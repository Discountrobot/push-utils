"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCertificateEnvError extends Error {
    constructor() {
        super('certificate is neither production or development');
        this.name = this.constructor.name;
    }
}
exports.InvalidCertificateEnvError = InvalidCertificateEnvError;
//# sourceMappingURL=invalid-certificate-env.js.map