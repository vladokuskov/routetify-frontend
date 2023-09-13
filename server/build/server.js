"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const api_1 = __importDefault(require("./api"));
const index_1 = __importDefault(require("@config/index"));
const logger_1 = __importDefault(require("@core/helpers/logger"));
app_1.default.use(api_1.default);
app_1.default
    .listen(index_1.default.port, () => {
    logger_1.default.info(`
  ################################################
  🛡️  Server listening on port: ${index_1.default.port} 🛡️
  ################################################
`);
})
    .on('error', (err) => {
    logger_1.default.error(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map