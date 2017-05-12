import winston = require("winston");
import config = require("config-lite");
winston.add(winston.transports.File,{filename : config.logFile});
winston.info("hahaha");