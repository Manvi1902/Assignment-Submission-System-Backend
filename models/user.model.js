import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
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
    },

},{ timestamps: true });

// Method to hash the user password before saving  
userSchema.pre('save',  async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

// Method to compare user passwords during login
userSchema.methods.isPasswordCorrect = async function (userPassword) {
    return await bcrypt.compare(userPassword,this.password);
};

export const User = mongoose.model("User",userSchema);
