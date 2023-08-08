import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
import { logger, errorlogger } from './shared/logger';

process.on('uncaughtException', error => {
  // console.log('uncaught exception is deteced dhik koro')
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function rootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
rootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
