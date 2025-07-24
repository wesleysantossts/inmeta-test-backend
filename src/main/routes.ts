import express from 'express';
import authRoutes from '@routes/auth.routes';
import employeeRoutes from '@routes/employee.routes';
import { errorHandler } from '@/presentation/middlewares/errors.middleware';

const routes = express();

routes.use('/auth', authRoutes);
routes.use('/employees', employeeRoutes);
routes.use(errorHandler);

export default routes;