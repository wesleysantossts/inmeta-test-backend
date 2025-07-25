import express from 'express';
import cors from 'cors';
import fs from 'fs';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import { env } from '@/infrastructure/config/environment';

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }), cors({
  origin: [
    `http://localhost:${env.port}`,
    `http://127.0.0.1:${env.port}`,
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control'
  ]
}));
app.use('/api', routes);

const file = fs.readFileSync('./swagger.yml', 'utf-8');
const swaggerDocs = YAML.parse(file);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;