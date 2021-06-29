import { Router } from 'express';

// guranteed to get dependencies
export default () => {

    const app = Router();

    app.get('/', async (req, res) => {
        res.render('portal', {})
    })

    return app;
}