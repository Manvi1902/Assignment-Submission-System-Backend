import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({  
    fullname: {
        type: String, 
        required: [true, 'Full name is required'] ,
        unique: true,  
        trim: true,
        index: true
   }, 
   username: {
        type: String, 
        required: [true, 'Username is required'] ,
        unique: true,  
        trim: true,
        index: true
   },  
   password: { 
       type: String,
       required:[true, 'Password is required'], 
   }, 
   email:{
       type: String,
       required:[true, 'Password is required'],  
   },
   role: { 
       type: String, default: 'user' 
   }
},{ timestamps: true });  


// Method to hash the admin password before saving  
adminSchema.pre('save', async function (next) {  
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next(); 
});  

// Method to compare passwords during login  
adminSchema.methods.isPasswordCorrect = async function (adminPassword) {  
    return await bcrypt.compare(adminPassword, this.password);  
}; 


export const Admin = mongoose.model('Admin', adminSchema);