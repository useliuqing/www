"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var config = require("config-lite");
winston.add(winston.transports.File, { filename: config.logFile });
winston.info("hahaha");
//# sourceMappingURL=test.js.map