import request from 'supertest';
import app from '../../src/main/server';

describe('E2E: Fluxo completo de autenticação', () => {
  const basePath = '/api/auth';

  describe('POST /api/auth/signup', () => {
    const testUser = {
      name: 'Wesley Teste',
      email: 'wesley@teste.com',
      password: '123456'
    };
    let authToken: string;

    it('deve registrar um novo usuário', async () => {
      const response = await request(app)
        .post(`${basePath}/signup`)
        .send(testUser)
        .expect(200);

      const data = response.body.data.datas;
      expect(data.user).toHaveProperty('id');
      expect(data.user.email).toBe(testUser.email);
      expect(data.user.name).toBe(testUser.name);
      expect(data.user).not.toHaveProperty('password');
      expect(data.token).toBeDefined();
      
      authToken = response.body.token;
    });
    it('deve rejeitar registro com e-mail repetido', async () => {
      const response = await request(app)
        .post(`${basePath}/signup`)
        .send(testUser)
        .expect(409);

      const data = response.body;
      expect(data.result).toBeFalsy();
      expect(data.response).toContain('Já existe um usuário cadastrado com esse email');
    });
    it.skip('deve rejeitar registro com dados incompletos', async () => {
      await request(app)
        .post(`${basePath}/signup`)
        .send({ email: 'test@test.com' })
        .expect(400)
        .expect(res => {
          expect(res.body.response).toBe('Todos os campos são obrigatórios');
        });
    });
  })
});