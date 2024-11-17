# System Setup and Execution Guide
This guide covers the steps to set up and run the admin assignment management system, which includes registering, logging in, viewing assignments, and accepting or rejecting assignments. The backend is built with Node.js, Express, MongoDB, and JWT for authentication.

# 1. Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher): Download Node.js
MongoDB (either local or MongoDB Atlas): Download MongoDB
Git (optional, for cloning the repository): Download Git

# 2. Clone the Repository
If the code is hosted on GitHub or another Git repository, clone it to your local machine:

bash
Copy code
git clone <repository-url>
cd project-directory

# 3. Install Dependencies
Use npm to install the required dependencies:

bash
Copy code
npm install

# 4. Environment Variables
Create a .env file in the root of your project to store environment variables.

# 5. Run the Server
Start the server using:
npm start

# 6. Available API Endpoints
Once the server is running, you can interact with the following endpoints. These can be tested using tools like Postman or cURL.

-**User Endpoints:**
    - `POST /register` - Register a new user.
    - `POST /login` - User login.
    - `POST /upload` - Upload an assignment.
    - `GET /admins`- fetch all admins
   
- **Admin Endpoints:**
    - `POST /register` - Register a new admin.
    - `POST /login` - Admin login.
    - `GET /assignments` - View assignments tagged to the admin.
    - `POST /assignments/:id/accept` - Accept an assignment.
    - `POST /assignments/:id/reject` - Reject an assignment.
 

 # 7. Testing: 
 Use Postman to send requests, including the Authorization header with Bearer <token> for protected routes.




