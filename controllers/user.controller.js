import { User } from "../models/user.model.js";  
import { Assignment } from "../models/assignment.model.js";  
import bcrypt from "bcrypt";  

// User registration handler  
const userRegister = async (req, res) => {  
    try {  
        // Destructure user details from the request body  
        const { fullname, username, email, password, role } = req.body;  
        
        // Validate that all required fields are provided  
        if (!fullname || !username || !email || !password || !role) {  
            return res.status(400).json({  
                success: false,  
                message: `All fields are required`  
            });  
        }  

        // Check if a user with the given email already exists  
        const existingUser = await User.findOne({ email });  
        if (existingUser) {  
            return res.status(401).send({  
                success: false,  
                message: `User already exists`  
            });  
        }  
       
        // Create a new user instance with the provided details  
        const user = new User({ fullname, username, email, password, role });   
        
        // Save the new user to the database  
        const savedUser = await user.save();  

        // If the user is saved successfully, return a success response  
        if (savedUser) {  
            console.log(savedUser);  
            return res.status(201).send({  
                success: true,  
                message: `User registered successfully`,  
            });  
        }  
    
    } catch (error) {  
        // Log errors and send an internal server error response  
        console.log(error);  
        return res.status(500).send({  
            message: `Error in register callback`,  
            success: false,   
        });  
    }  
};  

// User login handler  
const userLogin = async (req, res) => {  
   
try {  
    const { username, password } = req.body;   

    // Validate that username and password are provided  
    if (!username || !password) {  
        return res.status(401).json({  
            success: false,  
            message: "Please provide username and password"  
        });  
    }  

        // Find a user by username  
        const user = await User.findOne({ username });  
        
        // Check if the user exists  
        if (!user) {  
            return res.status(401).json({  
                success: false,  
                message: 'Invalid user credentials'  
            });  
        }  

        // Compare the provided password with the stored hashed password  
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {  
            return res.status(401).send({  
                success: false,  
                message: "Invalid username or password",  
            });  
        }    
 
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

       
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {  
        // Log errors and send an internal server error response  
        console.error(error);  
        return res.status(500).json({  
            success: false,  
            message: 'Internal server error'  
        });  
    }  
};  

// Fetch all admin users  
const fetchAllAdmins = async (req, res) => {  
    try {  
        // Query the database for users with the role of 'admin'  
        const admins = await User.find({ role: 'admin' });  
        
        // Return the list of admins  
        res.json({ success: true, admins });  
         
    } catch (error) {  
        // Log errors and send an internal server error response  
        res.status(500).json({ success: false, message: 'Error fetching admins' });  
    }  
};  

// Upload assignment handler  
const uploadAssignment = async (req, res) => {  

    // Destructure assignment details from the request body  
    const { user, task, description, admin, status } = req.body;  

    // Validate that all required fields are provided  
    if (!user || !task || !admin || !description || !status) {  
        return res.status(400).json({ success: false, message: 'All fields are required' });  
    }  

    // Create a new assignment instance with provided details  
    const assignment = new Assignment({ user, task, description, admin, status });  
    
    // Save the assignment to the database  
    await assignment.save();  

    // Return a success response  
    res.status(201).json({ success: true, message: 'Assignment uploaded successfully' });  
};  

// Export all handlers for routing  
export {  
    userRegister,  
    userLogin,  
    fetchAllAdmins,  
    uploadAssignment  
};
