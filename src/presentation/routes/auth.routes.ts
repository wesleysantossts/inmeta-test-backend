import express from 'express';
import { SignUpFactory } from '../../shared/factories/auth/SignUp.factory';

// /auth
const authRoutes = express.Router();

authRoutes.post('/signup', SignUpFactory)

export default authRoutes;