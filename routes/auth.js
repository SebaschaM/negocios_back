import { Router } from 'express';
import { AuthController } from '../controllers/index.js';

const routerAuth = Router();
const authController = new AuthController();

routerAuth.post('/login', [], authController.login);
routerAuth.post('/register', [], authController.register);
routerAuth.get('/profile/:idClient', [], authController.getProfile);
routerAuth.post('/updateprofile', [], authController.updateProfile);

export default routerAuth;
