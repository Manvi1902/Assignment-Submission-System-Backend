import { Assignment } from "../models/assignment.model.js";  

// View assignments for a specific admin  
const viewAssignment = async (req, res) => {  
    // Get the admin ID from the authenticated user (assuming middleware verifies the JWT)  
    const adminId = req.user.adminId;  
    
    try {  
        // Fetch assignments associated with the admin ID  
        const assignments = await Assignment.find({ admin: adminId });  
        
        // Send the assignments back in the response  
        res.status(200).json(assignments);  
    } catch (error) {  
        // Log any error that occurs while fetching assignments  
        console.error('Error fetching assignments:', error);  
        // Send an error response  
        res.status(500).json({ success: false, message: 'Failed to fetch assignments' });  
    }  
};  

// Accept a specific assignment by ID  
const acceptAssignment = async (req, res) => {  
    const { id } = req.params;  // Extract assignment ID from request parameters  
    console.log(req.params);  // Log the parameters for debugging purposes  

    try {  
        // Update the assignment's status to 'accepted'  
        await Assignment.findByIdAndUpdate(id, { status: 'accepted' });  

        // Send a success response  
        res.send('Assignment accepted');  
    } catch (error) {  
        // Log any error that occurs while updating the assignment  
        console.error('Error accepting assignment:', error);  
        
        // Send an error response  
        res.status(500).json({ success: false, message: 'Failed to accept assignment' });  
    }  
};  

// Reject a specific assignment by ID  
const rejectAssignment = async (req, res) => {  
    const { id } = req.params;  // Extract assignment ID from request parameters  

    try {  
        // Update the assignment's status to 'rejected'  
        await Assignment.findByIdAndUpdate(id, { status: 'rejected' });  
        
        // Send a success response  
        res.send('Assignment rejected');  
    } catch (error) {  
        // Log any error that occurs while updating the assignment  
        console.error('Error rejecting assignment:', error);  
        
        // Send an error response  
        res.status(500).json({ success: false, message: 'Failed to reject assignment' });  
    }  
};  

// Export the assignment handling functions  
export {  
    viewAssignment,  
    acceptAssignment,  
    rejectAssignment  
};