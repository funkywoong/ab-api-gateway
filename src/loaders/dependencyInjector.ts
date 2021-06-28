import { Container } from 'typedi';
import logger from '@src/loaders/logger';

export default async () => {
    try {

        // Set container for logger
        Container.set('logger', logger);

    } catch(e) {
        console.log(e);
    }
}