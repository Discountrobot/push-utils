"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCertificateEnvError extends Error {
    constructor() {
        super('unable to parse certificate, does not contain apns properties');
        this.name = this.constructor.name;
    }
}
exports.InvalidCertificateEnvError = InvalidCertificateEnvError;
//# sourceMappingURL=invalid-certificate-env.js.map