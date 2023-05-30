import express from 'express';

import fishRouter from '../routes/fish/fish.router.js';
import postsRouter from '../routes/posts/posts.router.js';
import usersRouter from '../routes/users/users.router.js';
import baitsRouter from '../routes/baits/baits.router.js';
import watersRouter from '../routes/waters/waters.router.js';
// import commentsRouter from '../routes/comments/comments.router.js';

const api = express.Router();

api.use('/fish', fishRouter);
api.use('/posts', postsRouter);
api.use('/users', usersRouter);
api.use('/baits', baitsRouter);
api.use('/waters', watersRouter);
// api.use('/comments', commentsRouter);

export default api;