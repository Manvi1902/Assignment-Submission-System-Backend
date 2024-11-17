//Routes for User
import express from 'express'
import { userRegister, userLogin, fetchAllAdmins , uploadAssignment} from '../controllers/user.controller.js'

const router = express.Router()

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/upload').post(uploadAssignment);
router.route('/getAll').get(fetchAllAdmins);

export default router;
