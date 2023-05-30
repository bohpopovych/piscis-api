import express from 'express';

import auth from '../../middleware/auth.middleware.js';

import { httpAddNewFish, httpGetAllFish } from './fish.controller.js';

const fishRouter = express.Router();

fishRouter.get('/', auth, httpGetAllFish);
fishRouter.post('/', auth, httpAddNewFish);

export default fishRouter;