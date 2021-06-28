import path from 'path';
require('dotenv').config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV == 'production' ? '.env' : '.env.dev'
    )
});

export default {
    /**
     * PORT set
     */
    PORT: process.env.PORT,

    /**
     * API prefix
     */
    API_PREFIX: '/api',

    /**
     * View engine
     */
    VIEW_ENGINE: 'ejs',
    VIEW_DIR : 'views',

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    }
}