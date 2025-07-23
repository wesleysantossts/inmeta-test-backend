import app from 'main/server';
import { env } from 'shared/utils/environment.utils';

app.listen(env.port, () => console.log(`=== Servidor em execução na porta ${env.port} ===`));