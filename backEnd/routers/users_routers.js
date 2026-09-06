import {Router} from 'express';
import userController from '../controller/auth_controller.js';
import verifyJWT from '../middleware/user.middleware.js';
const { registerUser , loginUser , checkVerifyToken } = userController;

const router = Router();

router.route('/registerUser').post(registerUser);
router.route('/loginUser').get(loginUser);
router.route('/check').get(verifyJWT,checkVerifyToken);

export default router;