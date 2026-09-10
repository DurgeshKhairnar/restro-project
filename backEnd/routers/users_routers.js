import {Router} from 'express';
import userController from '../controller/auth_controller.js';
import verifyJWT from '../middleware/user.middleware.js';
const { registerUser , loginUser , checkVerifyToken , logout , getRefreshAccessToken } = userController;

import categoryController from '../controller/category_controller.js';
const { addCategory , getAllCategory} = categoryController;
const router = Router();

router.route('/registerUser').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/check').get(verifyJWT,checkVerifyToken);
router.route('/logout').get(verifyJWT,logout);
router.route('/refreshToken').post(getRefreshAccessToken);


router.route('/addcategory').post(verifyJWT,addCategory);
router.route('/getAllcategory').get(verifyJWT,getAllCategory);

export default router;