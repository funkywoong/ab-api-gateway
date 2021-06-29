import { Router, Request, Response, NextFunction } from 'express';

import logger from '@src/loaders/logger'

const router = Router();

export default (app: Router) => {

    app.get('/sample', async (req: Request, res: Response, next: NextFunction) => {
        logger.info(
            `In Sample api`
        )
        console.log('body : ', req.body.target)
        return res.json({"message": "complete"})
    })

    app.post('/sample', async (req: Request, res: Response, next: NextFunction) => {
        logger.info(
            `In Sample api`
        )
        console.log('body : ', req.body.target)
        return res.json({"message": "complete"})
    })


}