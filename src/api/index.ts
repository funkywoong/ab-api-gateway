import { Router } from 'express';
import vod from '@src/api/routes/proxy/vod'
import sample from '@src/api/routes/sample'
// import user from '@src/api/routes/user';


// guranteed to get dependencies
export default () => {

    const app = Router();

    // Proxy to vod service(s3) in k8s
    vod(app)

    // Sample route
    sample(app)

    return app;
}