const BusinessController = require('./controllers/BusinessController');
const CustomerController = require('./controllers/CustomerController');
const EmployeeController = require('./controllers/EmployeeController');
const express = require('express');
const path = require('path');
const { protectRoutes } = require('./middleware/authMiddleware');
const UserController = require('./controllers/UserController');
const TransactionController = require('./controllers/TransactionController');
const ExpenseController = require('./controllers/ExpenseController');

const router = express.Router();

// Serves the static files
router.use(express.static(path.join(__dirname, 'public')));

// Define the routes to serve the index page
router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// User registration
router.get('/register', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
router.post('/api/users/register', UserController.registerUser);

// User login
router.get('/login', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
router.post('/api/users/login', UserController.loginUser);

// Dashboard
router.get('/dashboard', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Business routes
router.get('/businesses', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'business.html'));
});
router.post('/api/businesses/register', protectRoutes, BusinessController.registerBusiness);
router.get('/api/businesses/mybusinesses', protectRoutes, BusinessController.displayBusinesses);
router.put('/api/businesses/:id', protectRoutes, BusinessController.updateBusiness);
router.delete('/api/businesses/:id', protectRoutes, BusinessController.deleteBusiness);

//Customers routes
router.get('/customers', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customers.html'));
});
router.get('/api/customers/mycustomers', protectRoutes, CustomerController.displayCustomers);
router.post('/api/customers/register', protectRoutes, CustomerController.registerCustomer);
router.put('/api/customers/:id', protectRoutes, CustomerController.updateCustomer);
router.delete('/api/customers/:id', protectRoutes, CustomerController.deleteCustomer);

// Employees routes
router.get('/employees', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'employees.html'));
});
router.get('/api/employees/myemployees', protectRoutes, EmployeeController.displayEmployees);
router.post('/api/employees/register', protectRoutes, EmployeeController.registerEmployee);
router.put('/api/employees/:id', protectRoutes, EmployeeController.updateEmployee);
router.delete('/api/employees/:id', protectRoutes, EmployeeController.deleteEmployee);

// Transaction routes
router.get('/transactions', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'transactions.html'));
});
router.get('/api/transactions/alltransactions', protectRoutes, TransactionController.postTransactions);
router.get('/api/transactions/totalEarnings', protectRoutes, TransactionController.totalEarnings);
router.post('/api/transactions/new-transaction', protectRoutes, TransactionController.createTransaction);
router.put('/api/transactions/:id', protectRoutes, TransactionController.updateTransaction);
router.delete('/api/transactions/:id', protectRoutes, TransactionController.deleteTransaction);

// Expenses routes
router.get('/expenses', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'expenses.html'));
});
router.get('/api/expenses/allexpenses', protectRoutes, ExpenseController.postExpenses);
router.post('/api/expenses/new-expense', protectRoutes, ExpenseController.createExpense);
router.put('/api/expenses/:id', protectRoutes, ExpenseController.updateExpense);
router.delete('/api/expenses/:id', protectRoutes, ExpenseController.deleteExpense);

module.exports = router;


