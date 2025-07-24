import express from 'express';

import { EmployeeFactory } from '@/shared/factories/employee.factory';
import { authMiddleware } from '../middlewares/auth.middleware';

// /employees
const employeeRoutes = express.Router();

employeeRoutes.post('/', authMiddleware, async (req, res) => await EmployeeFactory().create(req, res))
employeeRoutes.put('/:id', authMiddleware, async (req, res) => await EmployeeFactory().update(req, res))

export default employeeRoutes;