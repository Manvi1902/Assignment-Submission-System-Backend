//Routes for Admin | Assignment
import express from 'express';  
import {adminRegister,adminLogin,viewAssignmentsByAdmin,acceptAssignmentByAdmin,rejectAssignmentByAdmin} from '../controllers/admin.controller.js';  // Adjust the path if needed  
import adminAuthMiddleware from '../middlewares/adminAuth.middleware.js';     // Adjust the path if needed  

const router = express.Router();  

router.route('/register').post(adminRegister);   
router.route('/login').post(adminLogin);  
router.route('/assignments',adminAuthMiddleware,viewAssignmentsByAdmin);  
router.route('/assignments/:id/accept').put(adminAuthMiddleware, acceptAssignmentByAdmin);  
router.route('/assignments/:id/reject').put(adminAuthMiddleware,rejectAssignmentByAdmin);  

export default router;

