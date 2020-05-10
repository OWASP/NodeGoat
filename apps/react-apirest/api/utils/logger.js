const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            const {
                timestamp, level, message, ...args
            } = info;

            const ts = timestamp.slice(0, 19).replace('T', ' ');

            const levelPadded = level.padEnd(15);
            return `${ts} [${levelPadded}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
    ),
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            stderrLevels: ["error"]
        })
    ]
});

module.exports = logger;
