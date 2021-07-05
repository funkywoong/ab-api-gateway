import { Router } from 'express';
import vod from '@src/api/routes/proxy/vod'
import efs from "@src/api/routes/proxy/efs"
import sample from '@src/api/routes/sample'
// import user from '@src/api/routes/user';


// guranteed to get dependencies
export default () => {

    const app = Router();

    // Proxy to vod service(s3) in k8s
    vod(app)

    // Proxy to efs service in k8s
    efs(app)

    // Sample route
    sample(app)

    return app;
}