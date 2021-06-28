const { createProxyMiddleware } = require('http-proxy-middleware');
const passport = require('passport')

const logger = require('../../../loaders/logger')

const VOD_SERVICE_URL = "http://vod-service:3000"

export default (app) => {

    const filter = function (pathname, req) {
        logger.info("API-GW proxy: ", req.headers.host);
        logger.info(pathname.match('^/api/vod'));
        return pathname.match('^/api/vod');
    }

    app.use(
        '/users',
        passport.authenticate('jwt', { session: false }), 
        createProxyMiddleware(filter, {
        target: VOD_SERVICE_URL,
        secure: false,
        changeOrigin: true
    }));

}