import express from 'express';
import cors from 'cors';
import fs from 'fs';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';

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

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    error: 'Muitas requisições deste IP, tente novamente em 1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter, routes);

const file = fs.readFileSync('./swagger.yml', 'utf-8');
const swaggerDocs = YAML.parse(file);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;