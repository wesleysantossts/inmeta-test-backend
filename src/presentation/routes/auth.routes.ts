import express from 'express';

import { SignUpFactory } from '../../shared/factories/auth/SignUp.factory';

// /auth
const authRoutes = express.Router();

authRoutes.post('/signup', async (req, res) => await SignUpFactory().signUp(req, res))

export default authRoutes;