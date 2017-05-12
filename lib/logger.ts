import winston = require("winston");
import config = require("config-lite");

export default winston.add(winston.transports.File,{filename : config.logFile});