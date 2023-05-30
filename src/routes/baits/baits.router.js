import express from 'express';

import auth from '../../middleware/auth.middleware.js';

import { httpAddNewBait, httpGetAllBaits } from './baits.controller.js';

const baitsRouter = express.Router();

baitsRouter.get('/', auth, httpGetAllBaits);
baitsRouter.post('/', auth, httpAddNewBait);

export default baitsRouter;
