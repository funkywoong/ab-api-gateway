import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from '@src/loaders/logger'

// const VOD_SERVICE_URL = "http://vod-service:3001"
const VOD_SERVICE_URL = "http://localhost:3001"

export default (app) => {

    const filter = function (pathname, req) {
        logger.info("API-GW proxy: ", req.headers.host);
        logger.info(pathname.match('^/api/vod'));
        return pathname.match('^/api/vod');
    }

    app.use(
        '/vod',
        createProxyMiddleware(filter, {
        target: VOD_SERVICE_URL,
        secure: false,
        changeOrigin: true
    }));

}