import mongoose from "mongoose";  

const assignmentSchema = new mongoose.Schema({  
    userId: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  
        required: true,
        index: true, // Index for quicker queries
    },  
    task: {   
        type: String,   
        required: [true, "This field is required"],  
    },  
    admin: {   
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Admin',  
        required: true,  
        index: true, // Index for quicker queries
    },   
    status: {  
        type: String,   
        enum: ['pending', 'accepted', 'rejected', 'submitted'],   
        default: 'pending',  
    },  
}, { timestamps: true });  

export const Assignment = mongoose.model("Assignment", assignmentSchema);
