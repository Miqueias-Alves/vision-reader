import { Router } from 'express'

import { upload, confirm } from '../controllers/measure.controller';

const measuringRouter: Router = Router();

measuringRouter.post('/upload', upload);
measuringRouter.patch('/confirm', confirm);

export default measuringRouter;
