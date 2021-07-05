import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from '@src/loaders/logger'

const VOD_SERVICE_URL = "http://ab-efs-service:3002"
// const EFS_SERVICE_URL = "http://localhost:3002"

export default (app) => {

    const filter = function (pathname, req) {
        logger.info("API-GW proxy: ", pathname);
        logger.info(pathname.match('^/api/efs'));
        // console.log("req body : ", req.body)
        return pathname.match('^/api/efs');
    }

    app.use(
        '/efs',
        createProxyMiddleware(filter, {
        target: EFS_SERVICE_URL,
        secure: false,
        changeOrigin: true
    }));

}