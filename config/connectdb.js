import mongoose from 'mongoose'; 
import colors from 'colors'; 

// Asynchronous function to connect to MongoDB  
export const connectDB = async () => {  
    try {  
        // Attempt to connect to MongoDB using the connection string stored in environment variables  
        await mongoose.connect(process.env.MONGODB_URL);  
        
        // Log a success message to the console, indicating a successful connection  
        console.log(`Connected to MongoDB!!! ${mongoose.connection.host}`.bgCyan.white);   
    } catch (error) {  
        // Log an error message to the console if the connection fails  
        console.log(`MongoDB Connect Error: ${error}`.bgRed.white);   
    }  
};