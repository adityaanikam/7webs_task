# Book Review Platform

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a platform for users to add, view, and review books, fulfilling all functional requirements of a modern web application.

## ✨ Features

* **User Authentication**: Secure signup and login for users using JSON Web Tokens (JWT).
* **Book Management**: Authenticated users can add new books with a title, author, and genre.
* **Book Discovery**: View a paginated list of all books, with options to filter by genre or author and sort by rating or date added.
* **Reviews and Ratings**: Users can write text reviews and give a 1-5 star rating to any book.
* **Average Rating**: The average star rating is calculated and displayed for each book on both the list and detail pages.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Frontend**: React (with Hooks), React Router, Axios
* **Styling**: Material-UI (MUI)
* **Authentication**: JSON Web Tokens (JWT), bcryptjs

## 📂 Project Structure

The project is organized into two main directories: `backend` and `frontend`, creating a clean separation between the server-side and client-side code.

```

book-review-platform/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/
├── .gitignore
├── package.json
├── public/
└── src/
├── api/
├── components/
├── pages/
├── App.js
└── index.js

````

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* Node.js (v14 or later)
* npm
* MongoDB (either a local installation or a free Atlas cluster)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add your environment variables. See the example below.
4.  Start the server:
    ```bash
    npm start
    ```
    The backend will run on `http://localhost:5000`.

### Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm start
    ```
    The frontend will run on `http://localhost:3000`.

### Environment Variables

Your backend needs a `.env` file with the following variables:

```env
# Server port
PORT=5000

# MongoDB Connection URI (replace with your local or Atlas string)
MONGODB_URI="**********************"

# Secret key for signing JWTs
JWT_SECRET="your_super_secret_jwt_key"
````

-----

## 🏛️ Architecture Decisions

  * **REST API**: A standard RESTful API architecture was used for a clean separation between the backend (data/logic) and the frontend (presentation).
  * **Database Model**: I used a referenced model for the one-to-many relationship between books and reviews. Instead of embedding all reviews inside a book document, the `reviews` collection holds the reviews, and the book document stores an array of review IDs. This approach is more scalable and avoids overly large documents.
  * **Authentication**: JWT was chosen for stateless authentication, which is a modern standard for securing APIs. The token is stored on the client and sent with each protected request.

## ⚠️ Known Limitations

  * **No Edit/Delete**: Users cannot currently edit or delete their reviews or books they have added.
  * **Simple Error Handling**: Frontend error handling is minimal and could be improved with more user-friendly messages for different API errors.
  * **No User Profiles**: There are no dedicated user profile pages.

## 📞 Contact & Questions

For any questions about this implementation or approach:

  - **Email:** adityanikam9502@gmail.com
  - **LinkedIn:** https://www.linkedin.com/in/aditya-nikam-a23868250/
  - **GitHub:** https://github.com/adityaanikam

