import {Router} from 'express';
import userController from '../controller/auth_controller.js';
import verifyJWT from '../middleware/user.middleware.js';
const { registerUser , loginUser , checkVerifyToken , logout , getRefreshAccessToken } = userController;
import { addProduct ,getProduct , updateProduct , deleteProduct } from '../controller/product_controller.js';

import categoryController from '../controller/category_controller.js';
const { addCategory , getAllCategory , updateCategory , deleteCategory} = categoryController;
const router = Router();

router.route('/registerUser').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/check').get(verifyJWT,checkVerifyToken);
router.route('/logout').get(verifyJWT,logout);
router.route('/refreshToken').post(getRefreshAccessToken);


router.route('/addcategory').post(verifyJWT,addCategory);
router.route('/getAllcategory').get(verifyJWT,getAllCategory);
router.route('/updateCategory/:id').put(verifyJWT,updateCategory)
router.route('/deleteCategory/:id').delete(verifyJWT,deleteCategory);

router.route('/addProducts').post(verifyJWT,addProduct);
router.route('/getAllProducts').get(verifyJWT,getProduct);
router.route('/updateProduct/:id').put(verifyJWT,updateProduct);
router.route('/deleteProduct/:id').delete(verifyJWT,deleteProduct);

export default router;