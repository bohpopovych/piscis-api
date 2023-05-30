import path from 'path';
import * as url from 'url';

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import fileUpload from 'express-fileupload';

import api from '../src/routes/api.js';

const app = express();

app.use(cors());
app.use(fileUpload());

app.use(morgan('combined'));

app.use(express.json());

app.use('/v1', api);
app.use('/uploads', express.static(path.join(url.fileURLToPath(new URL('.', import.meta.url)), '..', 'uploads')));

export default app;