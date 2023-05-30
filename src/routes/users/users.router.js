import express from 'express';

import { httpRegisterUser, httpLoginUser } from './users.controller.js';

const usersRouter = express.Router();

usersRouter.post('/', httpRegisterUser);
usersRouter.post('/login', httpLoginUser);

export default usersRouter;