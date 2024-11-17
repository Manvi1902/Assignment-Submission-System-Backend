import jwt from 'jsonwebtoken';  
import { Admin } from '../models/admin.model.js'; // Import the Admin model  
import { Assignment } from '../models/assignment.model.js'; // Import the Assignment model  
import bcrypt from "bcrypt"; // Import bcrypt for password hashing  

// Admin registration handler  
const adminRegister = async (req, res) => {  
    try {  
        // Destructure required fields from the request body  
        const { fullname, username, password, email, role } = req.body;  
    
        // Check if all required fields are provided  
        if (!fullname || !username || !email || !password || !role) {  
            return res.status(400).json({  
                success: false,  
                message: 'All fields are required'  
            });  
        }   

        // Check if admin already exists based on email  
        const isAdminExisted = await Admin.findOne({ email });  
        if (isAdminExisted) {  
            return res.status(409).json({  
                success: false,  
                message: 'Admin already registered'  
            });  
        }  
   
        // Hash the password using bcrypt before storage  
        const hashedPassword = await bcrypt.hash(password, 10);  
        
        // Create a new admin instance with the provided details  
        const newAdmin = new Admin({ fullname, username, password: hashedPassword, email, role });   
        
        // Save the admin to the database  
        const savedAdmin = await newAdmin.save();   

        // If admin saved successfully, generate a JWT token  
        if (savedAdmin) {  
            const token = jwt.sign({ id: savedAdmin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });  
            return res.status(201).json({  
                success: true,  
                message: 'Admin registered successfully',  
                token // Include the token in the response  
            });  
        }   

    } catch (error) {   
        console.error(error); // Log the error for debugging  
        res.status(500).json({ // Use 500 for server errors  
            success: false,  
            message: 'Error in registration process',  
        });  
    }  
};  

// Admin login handler  
const adminLogin = async (req, res) => {  
    try {        
        // Destructure username and password from the request body  
        const { username, password } = req.body;   
        
        // Validate username and password presence  
        if (!username || !password) {  
            return res.status(401).json({  
                success: false,  
                message: "Please provide username and password"  
            });  
        }  

        // Find the admin by username  
        const admin = await Admin.findOne({ username });  

        // Validate if the admin exists and verify the password  
        if (!admin || !(await bcrypt.compare(password, admin.password))) {  
            return res.status(400).json({ message: 'Invalid credentials.' });  
        }  
        
        // Generate JWT token after successful validation  
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });  

        return res.status(201).json({  
            success: true,  
            message: `Successfully Logged In`,  
            token // Include token in response  
        });   

    } catch (error) {  
        console.error(error); // Log the error for debugging  
        res.status(400).json({ message: "Error in login callback" });  
    }  
};  

// View assignments for the authenticated admin  
const viewAssignmentsByAdmin = async (req, res) => {  
    try {  
        // Fetch assignments associated with the authenticated admin's ID  
        const assignments = await Assignment.find({ _id: id, admin: req.admin.id }); // Ensure to filter by authenticated admin's ID  
        res.status(200).json(assignments);

    } catch (error) {  
        console.error(error); // Log the error  
        res.status(500).json({ message: error.message });  
    }  
};  

// Accept an assignment by ID  
const acceptAssignmentByAdmin = async (req, res) => {  
    const { id } = req.params;  

    try {  
        // Find the assignment by ID  
        const assignment = await Assignment.findOne({ _id: id, admin: req.admin.id });  
        if (!assignment) {  
            return res.status(404).json({ message: 'Assignment not found.' });  
        }  
        
        // Update the assignment's status to 'accepted'  
        assignment.status = 'accepted';   
        await assignment.save();  

        res.status(200).json({ message: 'Assignment accepted successfully.' });  
    } catch (error) {  
        console.error(error); // Log the error  
        res.status(500).json({ message: error.message });  
    }  
};  

// Reject an assignment by ID  
const rejectAssignmentByAdmin = async (req, res) => {  
    const { id } = req.params;  

    try {  
        // Find the assignment by ID  
        const assignment = await Assignment.findOne({ _id: id, admin: req.admin.id });  
        if (!assignment) {  
            return res.status(404).json({ message: 'Assignment not found.' });  
        }  
        
        // Update the assignment's status to 'rejected'  
        assignment.status = 'rejected';   
        await assignment.save();  

        res.status(200).json({ message: 'Assignment rejected successfully.' });  
    } catch (error) {  
        console.error(error); // Log the error  
        res.status(500).json({ message: error.message });  
    }  
};  

// Export the admin handling functions for routing  
export {  
    adminRegister,  
    adminLogin,  
    viewAssignmentsByAdmin,  
    acceptAssignmentByAdmin,  
    rejectAssignmentByAdmin  
};