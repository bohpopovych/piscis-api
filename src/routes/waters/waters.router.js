import express from 'express';

import auth from '../../middleware/auth.middleware.js';

import { httpAddNewWater, httpGetAllWaters } from './waters.controller.js';

const watersRouter = express.Router();

watersRouter.get('/', auth, httpGetAllWaters);
watersRouter.post('/', auth, httpAddNewWater);

export default watersRouter;