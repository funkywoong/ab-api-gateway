import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path'

import routes from '@src/api'
import publicRoute from '@src/public'
import config from '@src/config';
import logger from '@src/loaders/logger';

export default async ({ app }: { app: express.Application }) => {

    /**
     * Healt Check endpoints
     */
    app.get('/status', (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.head('/status', (req: Request, res: Response) => {
        res.status(200).end();
    })

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json());

    // Load CookieParser
    app.use(cookieParser());

    // Enable cors
    app.use(cors());

    // Set ejs view
    app.set("view engine", "ejs");
    app.set("views", path.resolve(process.cwd(), 'src', 'views'))
    app.use(express.static(path.resolve(process.cwd(), 'src', 'public')))

    app.use('/', publicRoute())

    // Load api module
    app.use(config.API_PREFIX, routes());
    logger.info('Api setting completed');

    /// catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req: Request, res: Response, next: NextFunction) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === "UnauthorizedError") {
            return res
                .status(err.status)
                .send({message : err.message})
                .end();
        }
        return next(err);
    });

    app.use((err, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};