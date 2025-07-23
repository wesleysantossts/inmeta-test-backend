import request from 'supertest';
import app from '../../src/main/server';

describe('E2E: Fluxo completo de autenticação', () => {
  it('deve executar verificar se a rota está recebendo requisições', async () => {
    await request(app)
      .post('/auth/signup')
      .expect(200)

    // Criar novo usuário
    // const newUser = { name: 'Carlos', email: 'carlos@test.com' };
    // const createRes = await request(app)
    //   .post('/api/users')
    //   .send(newUser)
    //   .expect(201);

    // const userId = createRes.body.id;

    // Buscar usuário criado
    // await request(app)
    //   .get(`/api/users/${userId}`)
    //   .expect(200)
    //   .expect(res => {
    //     expect(res.body.name).toBe('Carlos');
    //     expect(res.body.email).toBe('carlos@test.com');
    //   });

    // Tentar buscar usuário inexistente
    // await request(app)
    //   .get('/api/users/999')
    //   .expect(404);
  });
});