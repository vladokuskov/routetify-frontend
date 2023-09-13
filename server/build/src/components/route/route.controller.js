"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRoute = void 0;
const ServerError_1 = __importDefault(require("core/instances/ServerError"));
const http_status_1 = __importDefault(require("http-status"));
const route_service_1 = require("./route.service");
const parseRoute = async (req, res) => {
    try {
        const { file, extension, } = req.body;
        const result = await (0, route_service_1.parse)(file, extension);
        if (result) {
            res.status(http_status_1.default.OK);
            res.json(result);
        }
    }
    catch (error) {
        if (error instanceof ServerError_1.default) {
            res.status(error.code || 502);
            res.json({ error: error.message });
        }
        else {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR);
            res.json({ error: 'Internal server error' });
        }
    }
};
exports.parseRoute = parseRoute;
//# sourceMappingURL=route.controller.js.map