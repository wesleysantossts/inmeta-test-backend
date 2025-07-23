import express from 'express';
import authRoutes from '@routes/auth.routes';
import employeeRoutes from '@routes/employee.routes';

const routes = express();

routes.use('/auth', authRoutes);
routes.use('/employees', employeeRoutes);

export default routes;