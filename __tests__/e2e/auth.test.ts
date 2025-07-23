import request from 'supertest';
import app from '../../src/main/server';

describe('E2E: Fluxo completo de autenticação', () => {
  
  describe('POST /api/auth/signup', () => {
    const testUser = {
      name: 'Wesley Teste',
      email: 'wesley@teste.com',
      password: '123456'
    };

    let authToken: string;

    it('deve verificar se a rota está recebendo requisições', async () => {
      await request(app)
        .post('/auth/signup')
        .expect(200)
    });
    
    it('deve registrar um novo usuário', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send(testUser)
        .expect(201);

      const data = response.body.body.datas;
      expect(data.user).toHaveProperty('id');
      expect(data.user.email).toBe(testUser.email);
      expect(data.user.name).toBe(testUser.name);
      expect(data.user).not.toHaveProperty('password');
      expect(data.token).toBeDefined();
      
      authToken = response.body.token;
    });
    it('deve rejeitar registro com e-mail repetido', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send(testUser)
        .expect(400)
        .expect(res => {
          expect(res.body.message).toBe('Email já cadastrado');
        });
    });
    it('deve rejeitar registro com dados incompletos', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({ email: 'test@test.com' })
        .expect(400)
        .expect(res => {
          expect(res.body.message).toBe('Todos os campos são obrigatórios');
        });
    });
  })
});