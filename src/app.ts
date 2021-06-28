
import 'reflect-metadata'; // We need this in order to use @Decorators

if (process.env.NODE_ENV == 'production') {
    require('module-alias/register');
}

import config from '@src/config';
import loaders from '@src/loaders';
import logger from '@src/loaders/logger';

import express, { NextFunction, Request, Response } from 'express';

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
//   await loaders({ expressApp: app });
  logger.info('Dependent modules loading completed!');

  await loaders({ expressApp: app })

  app.listen(config.PORT, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.PORT} 🛡️
      ################################################
    `);
  }).on('error', err => {
    process.exit(1);
  });

}

startServer();