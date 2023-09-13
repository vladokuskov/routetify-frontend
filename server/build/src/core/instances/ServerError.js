"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = ServerError;
//# sourceMappingURL=ServerError.js.map