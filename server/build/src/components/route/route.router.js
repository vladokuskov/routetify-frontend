"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_controller_1 = require("./route.controller");
const route_middleware_1 = require("core/middleware/route.middleware");
const router = (0, express_1.Router)();
router.post('/parse', route_middleware_1.verifyFileRequest, route_controller_1.parseRoute);
exports.default = router;
//# sourceMappingURL=route.router.js.map