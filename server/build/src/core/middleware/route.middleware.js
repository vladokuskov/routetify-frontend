"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFileRequest = void 0;
const ServerError_1 = __importDefault(require("core/instances/ServerError"));
const getFileExtension_1 = require("core/utils/getFileExtension");
const verifyFileStructure_1 = require("core/utils/verifyFileStructure");
const http_status_1 = __importDefault(require("http-status"));
const multer_1 = __importDefault(require("multer"));
const verifyFileRequest = async (req, res, next) => {
    try {
        const upload = (0, multer_1.default)({
            limits: {
                fileSize: 5 * 1024 * 1024, // 5 MB in bytes
            },
        }).single('file');
        upload(req, res, async (err) => {
            if (err || !req.file) {
                res.status(http_status_1.default.EXPECTATION_FAILED);
                res.json({
                    error: err.message ||
                        'Provide request with correct fields in form. ("file": content)',
                });
            }
            else {
                try {
                    const file = req.file;
                    const name = file.originalname;
                    const extension = await (0, getFileExtension_1.getFileExtension)(name);
                    await (0, verifyFileStructure_1.verifyFileStructure)(file, extension);
                    // All checks passed
                    req.body = { file, extension };
                    next();
                }
                catch (error) {
                    if (error instanceof ServerError_1.default) {
                        res.status(error.code || http_status_1.default.INTERNAL_SERVER_ERROR);
                        res.json({ error: error.message || 'Internal server error' });
                    }
                    else {
                        res.status(http_status_1.default.INTERNAL_SERVER_ERROR);
                        res.json({ error: 'Internal server error' });
                    }
                }
            }
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR);
        res.json({ error: 'Internal server error' });
    }
};
exports.verifyFileRequest = verifyFileRequest;
//# sourceMappingURL=route.middleware.js.map