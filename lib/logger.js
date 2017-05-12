"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var config = require("config-lite");
exports.default = winston.add(winston.transports.File, { filename: config.logFile });
//# sourceMappingURL=logger.js.map