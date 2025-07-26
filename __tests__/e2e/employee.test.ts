import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import app from '../../src/main/server';

describe('E2E: Fluxo completo de colaboradores', () => {
  const prisma = new PrismaClient();
  const basePath = '/api';
  
  const testUser = {
    name: 'Wesley Teste',
    email: 'wesley@teste.com',
    password: '123456'
  };
  let userId: string;
  let authToken: string;
  
  const testEmployee = {
    name: "Wesley",
    document: "12345678911",
    hiredAt: "24/07/2025"
  }
  let employeeId: string;

  beforeAll(async () => {
    const foundUser = await prisma.user.findFirst({
      where: { email: testUser.email }
    });
    if (!foundUser) {
      const password = await bcrypt.hash(testUser.password, Number(process.env.HASH_SALT));
      const createdUser = await prisma.user.create({ data: { ...testUser, password } }); 
      if (createdUser) {
        userId = createdUser.id
        
        const response = await request(app)
          .post(`${basePath}/auth/signin`)
          .send({ email: testUser.email, password: testUser.password });
          
        const data = response.body.data;
        authToken = data?.token ?? '';
      };
    }
  })
  
  afterAll(async () => {
    const foundUser = await prisma.user.findFirst({
      where: { email: testUser.email }
    });
    if (foundUser) {
      await prisma.user.delete({ where: { id: foundUser.id } }); 
    }

    const foundEmployee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (foundEmployee) {
      await prisma.employee.delete({ where: { id: foundEmployee.id } });
    }

    await prisma.$disconnect()
  })
  
  describe('GET /api/employees', () => {

    it('deve buscar todos os colaboradores', async () => {
      const response = await request(app)
        .get(`${basePath}/employees`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response).toBeDefined();
    });
  })
  
  describe('POST /api/employees', () => {
    it('deve registrar um novo colaborador', async () => {
      const response = await request(app)
        .post(`${basePath}/employees`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(testEmployee)
        .expect(201);

      const data = response.body;
      employeeId = data.data.id;

      expect(data.result).toBeTruthy();
      expect(data.response).toContain('Colaborador criado com sucesso');
    });

    it('deve rejeitar registro com dados incompletos', async () => {
      await request(app)
        .post(`${basePath}/employees`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Teste' })
        .expect(400)
        .expect(res => {
          expect(res.body.response).toBe('Campos name, document e hiredAt são obrigatórios');
        });
    });
  })
  
  describe('PUT /api/employees', () => {
    it('deve atualizar um colaborador', async () => {
      const response = await request(app)
        .put(`${basePath}/employees/${employeeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Novo nome de teste' })
        .expect(200);

      const data = response.body;

      expect(data.result).toBeTruthy();
      expect(data.response).toContain('Colaborador atualizado com sucesso');
    });

    it('deve rejeitar registro com dados incompletos', async () => {
      await request(app)
        .put(`${basePath}/employees/${employeeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ randomField: 'teste' })
        .expect(400)
        .expect(res => {
          expect(res.body.response).toBe('Deve conter name, document ou hiredAt');
        });
    });
  })
});