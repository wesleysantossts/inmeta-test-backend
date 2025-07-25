import express from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { DocumentTypesFactory } from '@/shared/factories/documentTypes.factory';

// /document-types
const documentTypesRoutes = express.Router();

documentTypesRoutes.get('/', authMiddleware, async (req, res) => await DocumentTypesFactory().findAll(req, res));
documentTypesRoutes.post('/', authMiddleware, async (req, res) => await DocumentTypesFactory().create(req, res));
documentTypesRoutes.get('/:id', authMiddleware, async (req, res) => await DocumentTypesFactory().find(req, res));
documentTypesRoutes.put('/:id', authMiddleware, async (req, res) => await DocumentTypesFactory().update(req, res));
documentTypesRoutes.delete('/:id', authMiddleware, async (req, res) => await DocumentTypesFactory().delete(req, res));

export default documentTypesRoutes;