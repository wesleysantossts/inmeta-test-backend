import express from 'express';
import authRoutes from '@routes/auth.routes';
import employeeRoutes from '@routes/employee.routes';
import { errorHandler } from '@/presentation/middlewares/errors.middleware';
import documentTypesRoutes from '@/presentation/routes/documentType.routes';
import documentsRoutes from '@/presentation/routes/document.routes';

const routes = express();

routes.use('/auth', authRoutes);
routes.use('/employees', employeeRoutes);
routes.use('/document-types', documentTypesRoutes);
routes.use('/documents', documentsRoutes);
routes.use(errorHandler);

export default routes;