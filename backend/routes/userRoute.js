import express from 'express';
import { loginUser, registerUser } from '../controller/userController.js';


 const router = express.Router();

 router.post('/user-registration', registerUser);
 router.post('/user-login', loginUser);



 export default router