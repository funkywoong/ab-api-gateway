import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from '@src/loaders/logger'

const VOD_SERVICE_URL = "http://ab-vod-service:3001"
// const VOD_SERVICE_URL = "http://localhost:3001"

export default (app) => {

    const filter = function (pathname, req) {
        logger.info("API-GW proxy: ", pathname);
        logger.info(pathname.match('^/api/vod'));
        // console.log("req body : ", req.body)
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