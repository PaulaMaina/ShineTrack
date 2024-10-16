const Employee = require('../models/employees');

class EmployeeController {
    static async registerEmployee(req, res) {
        try {
            const idNumber = req.body.idNumber;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const phoneNumber = req.body.phoneNumber;
            const salary = req.body.salary;
            const employeeExists = await Employee.findOne({ idNumber });
            
            if (employeeExists){
                res.status(400).send({ error: 'This employee already exists' });
            }
            if (!idNumber || !firstName || !lastName || !phoneNumber || salary) {
                res.status(400).send({ error: 'Please fill out all the required fields to register your employee' });
            }

            const newEmployee = {
                idNumber: idNumber,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                salary: salary,
                business: req.business._id,
            };

            const employee = await Employee.create(newEmployee);
            res.status(201).send(employee);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    };

    static async displayEmployees(req, res) {
        try {
            // Retrieves all the employee registered under a specific business
            const employees = await Employee.find({ user: req.business._id });

            // Send employees to the frontend
            res.status(200).json(employees);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the employees'});
        }
    };
}

module.exports = EmployeeController;