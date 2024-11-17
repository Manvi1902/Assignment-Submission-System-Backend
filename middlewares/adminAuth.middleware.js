import jwt from 'jsonwebtoken';  
import { Admin } from '../models/admin.model.js'; 

const adminAuthMiddleware = async (req, res, next) => {  
    const token = req.header('Authorization')?.replace('Bearer ', '');  
    
    if (!token) {  
        return res.status(401).json({ message: 'Access denied, no token provided.' });  
    }  
    
    try {  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        req.admin = await Admin.findById(decoded.id);  
        if (!req.admin) {  
            return res.status(401).json({ message: 'Invalid token.' });  
        }  
        next();  
    } catch (err) {  
        return res.status(400).json({ message: 'Invalid token.' });  
    }  
};  

export default adminAuthMiddleware;