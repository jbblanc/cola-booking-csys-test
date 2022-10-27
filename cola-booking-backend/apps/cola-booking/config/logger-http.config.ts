import { hostname } from 'os';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

export const httpLoggerConfig = {
  baseMeta: {
    content: 'http',
    owner: 'colacorp',
    application: 'cola-booking',
    host: hostname(),
    env: process.env.NODE_ENV,
  },
  transports: [
    new DailyRotateFile({
      filename: process.env.LOGS_HTTP_FILE_NAME,
      dirname: process.env.LOGS_DIRNAME,
      utc: true, // for date in file name
      datePattern: process.env.LOGS_ROLLING_FILE_DATE_PATTERN, // rolls the file every hour
      zippedArchive: false, // to make sure filebeat always access the file content
      maxSize: process.env.LOGS_HTTP_FILE_MAX_SIZE,
      maxFiles: process.env.LOGS_HTTP_FILE_RETENTION,
      format: winston.format.combine(
        winston.format.timestamp({
          alias: '@timestamp',
        }),
        winston.format.json(),
      ),
    }),
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  headerBlacklist: ['authorization'],
  msg:
    '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms | user: {{req.accountId}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", req.accountId is set in request by custom AuthGuard
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  //ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
};
