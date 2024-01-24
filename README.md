# Library Management System (LMS) Project

Welcome to the Library Management System (LMS) project! This MERN stack application empowers users to efficiently manage their library activities, including issuing, returning, and ordering books. The system also incorporates an admin panel for seamless administration of books, users, and their roles.

## Features

### User Features

1. **Book Operations:**
   - Issue a book
   - Return a book
   - Order a book if not available in the library
   - Can keep track of his issued, returned and ordered books in user dashboard

2. **Notification System:**
   - Receive notifications via Gmail when the book ordered by user is available in the library 
   - Notifications include the expected time of arrival of the ordered book by the user
   - The web app sends a welcome message to the user upon registration
   - User receives a notification regarding issue date and expected retrun date when an user issues the book

3. **Limitations:**
   - Users can issue a maximum of 4 books at once
   - To issue more, users must return a book before issuing another

4. **Search Functionality:**
   - Utilize the search bar to find books based on their titles

5. **Penalty System:**
   -  If the user fails to return the book before or on the expected return date then user has to pay a fine of Rs. 1000/day (this is customisable by admin)
      
7. **Infinite Scrolling:**
   - Enjoy the convenience of infinite scrolling for a seamless browsing experience

### Admin Features

1. **User and Book Management:**
   - Add or remove books from the library
   - Remove users from the system
   - Change the role of any user, including granting admin privileges
   - User will never be able to access the admin panel without the correct credentials

2. **Monitoring:**
   - Keep track of the number of users and their ordered books

## Technologies Used

### Frontend

- React
- React Router DOM
- Axios
- React Helmet
- React Hot Toast
- React Icons
- React Infinite Scroll Component
- Typewriter Effect
- Web Vitals

### Backend

- Node.js
- Express
- Mongoose
- Bcryptjs
- CORS
- Dotenv
- Express Validator
- JSON Web Token (jsonwebtoken)
- Nodemailer

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install` in both the client and server directories.
3. Run the application using `npm run dev` for concurrent frontend and backend development.

Feel free to explore and enhance the functionality of the Library Management System. If you have any questions or feedback, please reach out !! 📚✨
