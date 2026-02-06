Full Stack User Management System (Task 1)


Project Description

This project is a Full Stack Web Application developed as part of Task 1 for Codveda Technologies.
The application implements a User Management System that allows users to be created, viewed, updated, and deleted (CRUD operations).

The goal of this project is to demonstrate:

Backend development using Node.js and Express

Database integration using MySQL

Frontend development using HTML, CSS, and JavaScript

Proper project organization and GitHub version control


Objectives of the Project


Build a functional full stack application

Connect a Node.js server to a MySQL database

Implement RESTful API endpoints

Serve frontend files using Express

Perform CRUD operations from the browser

Organize frontend and backend files professionally


Technologies Used

Backend

Node.js – JavaScript runtime environment

Express.js – Web framework for Node.js

MySQL – Relational database

mysql (npm package) – MySQL client for Node.js


Frontend


HTML5 – Page structure

CSS3 – Styling and layout

JavaScript (Vanilla JS) – Client-side logic and API calls


Tools


Git & GitHub – Version control

XAMPP – MySQL database server

VS Code – Code editor


Project Structure Explained

Task1/
│
├── public/
│   ├── index.html   → Frontend user interface
│   ├── style.css    → Application styling
│   └── script.js    → Frontend logic & API requests
│
├── server.js        → Backend server and API logic
├── package.json     → Project dependencies
├── package-lock.json
├── .gitignore       → Ignored files (node_modules)
└── README.md        → Project documentation

Why public/ folder?

The public folder contains all frontend files.
Express is configured to serve this folder as static content, which is a best practice in Node.js applications.


Database Configuration

Database Name
codveda_db

Table Structure

CREATE DATABASE codveda;
USE codveda_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);


The users table stores user information and is accessed by the backend API.


Backend Functionality (server.js)


The backend server:

Connects to MySQL

Listens on port 3000

Provides REST API endpoints


API Endpoints

Method	       Endpoint          	Description
GET	           /users	            Fetch all users
POST           /users            	Add a new user
PUT	           /users             /:id	Update a user
DELETE       	/users              /:id	Delete a user

These endpoints are consumed by the frontend using fetch API.


Frontend Functionality


The frontend allows the user to:

Enter name and email

Submit data to the server

View users dynamically without page reload

Edit user details

Delete users from the database

JavaScript handles all communication with the backend using HTTP requests.


SCREENSHOTS 




<img width="859" height="126" alt="image" src="https://github.com/user-attachments/assets/eb5fb01c-2a47-4618-94fe-ec29fa442a5a" />








<img width="1918" height="954" alt="image" src="https://github.com/user-attachments/assets/af33fcf5-0cec-4676-9ab8-4b7e0c18d1f9" />








<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/607d2b27-781a-477f-8ffb-ae62d6a55f47" />



