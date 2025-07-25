import express from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { DocumentTypesFactory } from '@/shared/factories/documentTypes.factory';

// /document-types
const documentTypesRoutes = express.Router();

documentTypesRoutes.post('/', authMiddleware, async (req, res) => await DocumentTypesFactory().create(req, res))
documentTypesRoutes.put('/:id', authMiddleware, async (req, res) => await DocumentTypesFactory().update(req, res))

export default documentTypesRoutes;