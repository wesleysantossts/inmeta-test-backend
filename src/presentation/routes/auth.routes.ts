import express from 'express';

import { AuthFactory } from '@/shared/factories/auth.factory';

// /auth
const authRoutes = express.Router();

authRoutes.post('/signup', async (req, res) => await AuthFactory().signUp(req, res))
authRoutes.post('/signin', async (req, res) => await AuthFactory().signIn(req, res))

export default authRoutes;