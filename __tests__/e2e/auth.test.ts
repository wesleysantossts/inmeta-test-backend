import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import app from '../../src/main/server';

describe('E2E: Fluxo completo de autenticação', () => {
  const prisma = new PrismaClient();
  const basePath = '/api/auth';
  
  const testUser = {
    name: 'Wesley Teste',
    email: 'wesley@teste.com',
    password: '123456'
  };
  let userId: string;
  let authToken: string;

  beforeAll(async () => {
    const foundUser = await prisma.user.findFirst({
      where: { email: testUser.email }
    });
    if (foundUser) {
      await prisma.user.delete({ where: { id: foundUser.id } }); 
    }
  })
  
  afterAll(async () => {
    const foundUser = await prisma.user.findUnique({ where: { id: userId } });
    if (foundUser) {
      await prisma.user.delete({ where: { id: foundUser.id } });
    }

    await prisma.$disconnect()
  })

  describe('POST /api/auth/signup', () => {

    it('deve registrar um novo usuário', async () => {
      const response = await request(app)
        .post(`${basePath}/signup`)
        .send(testUser)
        .expect(201);

      const data = response.body.data;
      userId = data.user.id;
      authToken = data.token;

      expect(data.user).toHaveProperty('id');
      expect(data.user.email).toBe(testUser.email);
      expect(data.user.name).toBe(testUser.name);
      expect(data.user).not.toHaveProperty('password');
      expect(data.token).toBeDefined();
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
    
    it('deve rejeitar registro com dados incompletos', async () => {
      await request(app)
        .post(`${basePath}/signup`)
        .send({ email: 'test@test.com' })
        .expect(400)
        .expect(res => {
          expect(res.body.response).toBe('Campos name, email e password são obrigatórios');
        });
    });
  })
  
  describe('POST /api/auth/signin', () => {
    const testUser = {
      email: 'wesley@teste.com',
      password: '123456'
    };
    let userId: string;
    let authToken: string;

    it('deve logar um usuário existente', async () => {
      const response = await request(app)
        .post(`${basePath}/signin`)
        .send({ email: testUser.email, password: testUser.password });
        
      const data = response.body.data;
      authToken = data.token;

      expect(response.status).toBe(200);
    });
    
    it('deve rejeitar login com e-mail não cadastrado', async () => {
      const response = await request(app)
        .post(`${basePath}/signin`)
        .send({ email: 'jordan@123.com', password: '1234' });
        
      expect(response.status).toBe(500);
    });
    
    it('deve rejeitar registro com dados incompletos', async () => {
      await request(app)
        .post(`${basePath}/signin`)
        .send({ email: 'test@test.com' })
        .expect(400)
        .expect(res => {
          expect(res.body.response).toBe('Campos email e password são obrigatórios');
        });
    });
  })
});