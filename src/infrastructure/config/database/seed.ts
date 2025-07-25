import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

async function generateSeed() {
  const prisma = new PrismaClient();

  const seedUser = {
    name: 'Teste',
    email: 'teste@teste.com.br',
    password: '123456',
  }
  const seedEmployee = {
    name: "Teste",
    document: "12345678911",
    hiredAt: "24/07/2025"
  }
  const seedDocumentType = {
    name: "CNH"
  }

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        name: seedUser.name,
      }
    });
    if (foundUser) throw new Error('Usuário já cadastrado');

    const password = await bcrypt.hash(seedUser.password, Number(process.env.HASH_SALT));
    const createdUser = await prisma.user.create({ data: { ...seedUser, password } });
    
    const foundEmployee = await prisma.employee.findFirst({
      where: {
        document: seedEmployee.document,
      }
    });
    if (foundEmployee) throw new Error('Colaborador já cadastrado');
    const createdEmployee = await prisma.employee.create({
      data: {
        ...seedEmployee,
        createdBy: createdUser.id,
        updatedBy: createdUser.id,
      }
    });

    const foundDocumentType = await prisma.documentType.findFirst({
      where: {
        name: seedDocumentType.name,
      }
    });
    if (foundDocumentType)  throw new Error('Tipo de documento já cadastrado');
    const createdDocumentType = await prisma.documentType.create({ data: seedDocumentType });

    const seedDocument = {
      name: "CNH.pdf",
      status: "PENDENTE",
      employeeId: createdEmployee.id,
      documentTypeId: createdDocumentType.id,
    }
    const foundDocument = await prisma.document.findFirst({
      where: {
        AND: [
          { employeeId: seedDocument.employeeId },
          { documentTypeId: seedDocument.documentTypeId },
        ]
      }
    });
    if (foundDocument) throw new Error('Documento já cadastrado');
    await prisma.document.create({ data: seedDocument });
    
    console.log('[generate-seed]: ', 'Seed criado com sucesso!');  
  } catch (error: any) {
    console.log('[error-generate-seed]: ', error.message);  
  } finally {
    await prisma.$disconnect();
  }
}

generateSeed();