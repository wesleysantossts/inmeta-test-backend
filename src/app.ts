import express from 'express';
import cors from 'cors';
import fs from 'fs';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

import { env } from 'shared/utils/environment.utils';

const app = express();
app.use('/api', express.json(), express.urlencoded({ extended: true }), cors());

const file = fs.readFileSync('./swagger.yml', 'utf-8');
const swaggerDocs = YAML.parse(file);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(env.port, () => console.log(`=== Servidor em execução na porta ${env.port} ===`));