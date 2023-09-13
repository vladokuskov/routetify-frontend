"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFileStructure = void 0;
const ServerError_1 = __importDefault(require("core/instances/ServerError"));
const http_status_1 = __importDefault(require("http-status"));
const verifyFileStructure = async (file, extension) => {
    const fileContent = file.buffer.toString();
    if (fileContent.length === 0) {
        throw new ServerError_1.default('Provide a file with content  inside.', http_status_1.default.NOT_ACCEPTABLE);
    }
    if (extension === 'gpx') {
    }
    if (extension === 'kml') {
    }
};
exports.verifyFileStructure = verifyFileStructure;
//# sourceMappingURL=verifyFileStructure.js.map