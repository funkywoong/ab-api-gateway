import { Router } from 'express';
import vod from '@src/api/routes/proxy/vod'
// import user from '@src/api/routes/user';


// guranteed to get dependencies
export default () => {

    const app = Router();

    // Proxy to vod service in k8s
    vod(app)

    return app;
}