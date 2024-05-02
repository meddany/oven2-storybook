// @ts-nocheck

const fs = require('fs');
const path = require('path');
const { createLogger, transports, format } = require('winston');

export class DEBUGGER {
  constructor(name, level = 'error', onscreen = true) {
    this.logger = createLogger({
      level: level,
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] - [${name}] - [${level.toUpperCase()}] - ${message}`;
        })
      ),
      transports: [
        new transports.File({ filename: path.join(this.homePath(), 'debug', `${name}.log`) })
      ]
    });

    if (onscreen) {
      this.logger.add(new transports.Console());
    }

    this.ensureLogDirectoryExists(name);
  }

  homePath() {
    return process.env.HOME
  }

  ensureLogDirectoryExists(name) {
    const logDirectory = path.join(this.homePath(), 'debug');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }
  }

  logWithStackTrace(level, message) {
    if (message instanceof Error) {
      this.logger.log(level, message.stack);
    } else {
      this.logger.log(level, message);
    }
  }

  info(message) {
    this.logWithStackTrace('info', message);
  }

  debug(message) {
    this.logWithStackTrace('debug', message);
  }

  warning(message) {
    this.logWithStackTrace('warn', message);
  }

  error(message) {
    this.logWithStackTrace('error', message);
  }

  critical(message) {
    this.logWithStackTrace('error', message);  // Assuming 'critical' logs are treated as 'error' level
  }
}
