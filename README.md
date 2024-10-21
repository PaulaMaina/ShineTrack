# ShineTrack: Carwash Management System
ShineTrack is a comprehensive carwash management system designed to streamline the business operations of carwash owners. It provides tools for tracking transactions, managing customers and employees, and monitoring daily performance, all within a simple and intuitive interface.

## Table of Contents


## Project Overview
ShineTrack helps carwash businesses organize and monitor key aspects of their operations, such as employee performance, customer management, and financial tracking. It offers a user-friendly platform to view real-time insights, handle transactions, and streamline service delivery.

## Features
1. Transaction Tracking
Track all transactions with detailed records of services, customer information, and total earnings.

2. Customer Management
Manage customer profiles, including their vehicle information, to offer a personalized service experience.

3. Employee Monitoring
Monitor employee activities and track performance to ensure accountability and efficient operations.

4. Business Insights
Gain real-time insights into daily performance, transaction summaries, and total earnings for better decision-making.

## Project Architecture
The ShineTrack project follows a 3-tier architecture for scalability and maintainability:

### Frontend (Presentation Layer)
The frontend is built using HTML, CSS, and JavaScript. It provides an intuitive interface for users to manage transactions, customers, and employees.
### Backend (Application Layer)
The backend is developed using Node.js and Express.js. It handles the business logic, API routes, and interactions with the database.
### Database (Data Layer)
ShineTrack uses MongoDB as its database. The data layer is responsible for storing and retrieving customer, employee, transaction, and business data.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Version Control:** Git
- **Testing:** Postman

## Setup Instructions

### Prerequisites
- Node.js - version 14 or higher
- MongoDB - locally or MongoDB Atlas for production

### Setting up the database
If you dont have MongoDB Atlas setup, perform the following steps:
1. Sign up at [MongoDB Atlas](https://mongodb.com/cloud/atlas) and create a cluster.
2. Add a new database user and whitelist your IP address or set access to "Allow from anywhere".
3. Obtain the **MongoDB connection URI** from the MongoDB Atlas dashboard

### Running locally
**Step 1: Clone the repository**
```bash
git clone https://github.com/<yourusername>/ShineTRack.git
cd ShineTrack
```
**Step 2: Install dependencies**
Navigate to the `root` directory and install the necessary dependencies by running `npm install`
```bash
cd root
npm install
```
**Step 3:Set up the environment variables**
In the `root` directory, create an `.env` file to store your environment variables. The following variables will be needed:
```bash
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shineTrack?retryWrites=true&w=majority      #Replace with your username and password
JWT_SECRET=your_jwt_secret_key      #Generate a secret key and replace this
```
**Step 4: Start the server
The frontend and backend part of this application use the same server. In the `root` directory, start the Node.js server
```bash
npm start
```
You can now use the application

## Usage Guidelines
**1. User Authentication:**
Log in to access business-related features like customer, employee and transaction management.

**2. Creating a new business:**
Add a new business to the application by using the registration form. You can add one or more businesses, as many as you own.

**3. Adding a Customer:**
Use the customer registration form to add new customers, including their vehicle details and contact information.

**4. Transaction Management:**
Track carwash transactions by recording vehicle details, services rendered, and employee details.

**5. Business Insights:**
Track the number of washes, customers, and total earnings from the dashboard.

**6. Tracking Business Expenses**
You can create, edit, and delete expenses in the expense page. This helps you to manage your spending.

## API Documentation
The key features of the application are `businesses`, `customers`, `transactions`, `employees`, and `expenses`. Each feature has the following routes:
1. GET `/featurepage` to server the respective frontend HTML page
2. GET `/api/feature/myfeature` to fetch the details of the feature. For instance, GET `/api/customers/mycustomers/` gets all customers from the database.
3. POST `/api/feature/register` to create a new record. For example, POST `/api/businesses/register` creates a new business in the database.
4. PUT `/api/feature/:id` to update a specific instance of the data in the database. PUT `/api/transactions/:id` updates the details of a specific transaction.
5. DELETE `/api/feature/:id` to delete a specific data object from the database. DELETE `/api/expenses/:id` deletes the details of a specific expense.

## Authors
**Name:** <Pauline Maina> 
**Email:** <kabura.mainap@gmail.com>