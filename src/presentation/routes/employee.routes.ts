import express from 'express';

import { EmployeeFactory } from '@/shared/factories/employee.factory';
import { authMiddleware } from '../middlewares/auth.middleware';

// /employees
const employeeRoutes = express.Router();

employeeRoutes.get('/', authMiddleware, async (req, res) => await EmployeeFactory().findAll(req, res));
employeeRoutes.post('/', authMiddleware, async (req, res) => await EmployeeFactory().create(req, res));
employeeRoutes.get('/:id', authMiddleware, async (req, res) => await EmployeeFactory().find(req, res));
employeeRoutes.put('/:id', authMiddleware, async (req, res) => await EmployeeFactory().update(req, res));
employeeRoutes.delete('/:id', authMiddleware, async (req, res) => await EmployeeFactory().delete(req, res));

employeeRoutes.get('/:id/document-status', authMiddleware, async (req, res) => await EmployeeFactory().findEmployeeDocumentStatus(req, res));
employeeRoutes.post('/:id/documents', authMiddleware, async (req, res) => await EmployeeFactory().sendDocument(req, res));
employeeRoutes.post('/:id/document-types', authMiddleware, async (req, res) => await EmployeeFactory().linkDocumentTypes(req, res));
employeeRoutes.delete('/:id/document-types', authMiddleware, async (req, res) => await EmployeeFactory().unlinkDocumentTypes(req, res));

export default employeeRoutes;