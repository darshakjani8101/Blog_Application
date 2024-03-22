<div align="center">
  <br />
      <img src="https://github.com/darshakjani8101/Blog_Application/blob/main/client/public/readme_img.png" alt="Project Banner">
  <br />
</div>

# MERN Stack Blog Application

Welcome to the Blog Application! This application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js), GraphQL, and Material UI. It provides functionalities for user authentication, creating, adding, updating, and deleting blogs, as well as adding and deleting comments on blogs.

## Features

- User Authentication and Authorization System
- GraphQL for API efficiency
- Storing User's blogs and comments in MongoDB
- Protecting User Routes
- Modern React App with Google fonts
- Beautiful UI with Material UI Library
- Complete Responsive Design
- Storing User Sessions in Local Storage

## Hosted Application
You can access the hosted application at https://dev-blog-yy15.onrender.com
- Initial loading could take up to 1 minute as we have hosted it on a free hosting service.

## Technologies Used
- **MongoDB:** NoSQL database used for storing blog data.
- **Express.js:** Backend framework for handling server-side logic and API requests.
- **React.js:** Frontend library for building user interfaces.
- **Node.js:** JavaScript runtime for server-side development.
- **GraphQL:** Query language for interacting with the backend API efficiently.
- **Material UI:** React component library for designing visually appealing user interfaces.

## Local Setup

### 1. Clone the repository:

```bash
git clone https://github.com/darshakjani8101/Blog_Application.git
```

### 2. Install dependencies:

```bash
# Navigate to the server directory
cd server
npm install

# Navigate to the client directory
cd ../client
npm install
```

### 3. Set up environment variables:
Create a .env file in the server directory and add the following variables:

```bash
MONGODB_URL=your_mongodb_uri
PORT=5000
```

### 4. Set up local server URL in client:
Modify below mentioned file in client directory and setup the following variable:

```bash
# Open client/src/index.tsx file and setup below variable
uri: "http://localhost:5000/graphql";
```

### 5. Run the application:

```bash
# Start the server
cd ../server
npm run dev

# Start the client
cd ../client
npm start
```

### 6. Access the application:
Open your web browser and visit http://localhost:3000 to access the MERN stack blog application.

## Contributors
### Darshak Jani
#### Github: https://github.com/darshakjani8101
#### LinkedIn: https://www.linkedin.com/in/darshakjani8101

