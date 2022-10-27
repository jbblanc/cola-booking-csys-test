import { hostname } from 'os';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const eventLoggerConfig = {
  level: 'info',
  defaultMeta: {
    content: 'event',
    owner: 'colacorp',
    application: 'cola-booking',
    host: hostname(),
    env: process.env.NODE_ENV,
  },
  transports: [
    // TODO Console should be activated only in DEV mode
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new DailyRotateFile({
      filename: process.env.LOGS_EVENT_FILE_NAME,
      dirname: process.env.LOGS_DIRNAME,
      utc: true, // for date in file name
      datePattern: process.env.LOGS_ROLLING_FILE_DATE_PATTERN, // rolls the file every hour
      zippedArchive: false, // to make sure filebeat always access the file content
      maxSize: process.env.LOGS_EVENT_FILE_MAX_SIZE,
      maxFiles: process.env.LOGS_EVENT_FILE_RETENTION,
      format: winston.format.combine(
        winston.format.timestamp({
          alias: '@timestamp',
        }),
        winston.format.json(),
      ),
    }),
    // other transports...
  ],
  // other options
};
