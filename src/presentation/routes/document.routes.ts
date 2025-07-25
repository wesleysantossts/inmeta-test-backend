import express from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { DocumentFactory } from '@/shared/factories/document.factory';

// /documents
const documentsRoutes = express.Router();

documentsRoutes.get('/', authMiddleware, async (req, res) => await DocumentFactory().findAll(req, res));
documentsRoutes.get('/pending-documents', authMiddleware, async (req, res) => await DocumentFactory().pendingDocuments(req, res));
documentsRoutes.get('/:id', authMiddleware, async (req, res) => await DocumentFactory().find(req, res));
documentsRoutes.post('/', authMiddleware, async (req, res) => await DocumentFactory().create(req, res));
documentsRoutes.put('/:id', authMiddleware, async (req, res) => await DocumentFactory().update(req, res));
documentsRoutes.delete('/:id', authMiddleware, async (req, res) => await DocumentFactory().delete(req, res));

export default documentsRoutes;