import express from 'express';

import auth from '../../middleware/auth.middleware.js';

import { httpAddNewPost, httpGetAllUserPosts } from './posts.controller.js';

const watersRouter = express.Router();

watersRouter.get('/', auth, httpGetAllUserPosts);
watersRouter.post('/', auth, httpAddNewPost);

export default watersRouter;