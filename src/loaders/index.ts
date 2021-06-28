import expressLoader from '@src/loaders/express';
import dependencyInjectorLoader from '@src/loaders/dependencyInjector'
import logger from '@src/loaders/logger'

export default async ({ expressApp }) => {

    // Database model dependency injection
    await dependencyInjectorLoader();
    logger.info('Dependency Injection completed')

    // express application setting
    await expressLoader({ app: expressApp });
    logger.info('Express module loading completed');

};