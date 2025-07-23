import app from 'main/server';
import { env } from '@/infrastructure/config/environment';

app.listen(env.port, () => console.log(`=== Servidor em execução na porta ${env.port} ===`));