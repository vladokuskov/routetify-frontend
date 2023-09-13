"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = void 0;
const ServerError_1 = __importDefault(require("core/instances/ServerError"));
const http_status_1 = __importDefault(require("http-status"));
const index_1 = __importDefault(require("config/index"));
const getFileExtension = async (filename) => {
    const parts = filename.split('.');
    if (parts.length !== 2) {
        throw new ServerError_1.default('Provide a file with a single extension.', http_status_1.default.NOT_ACCEPTABLE);
    }
    const extension = parts[1].toLowerCase();
    if (!index_1.default.allowedExtensions.includes(extension)) {
        throw new ServerError_1.default('Provide a file with a correct extension.', http_status_1.default.NOT_ACCEPTABLE);
    }
    return extension;
};
exports.getFileExtension = getFileExtension;
//# sourceMappingURL=getFileExtension.js.map