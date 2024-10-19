const Employee = require('../models/employees');

class EmployeeController {
    static async registerEmployee(req, res) {
        try {
            const idNumber = req.body.idNumber;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const phoneNumber = req.body.phoneNumber;
            const salary = req.body.salary;
            const business = req.body.business;
            const employeeExists = await Employee.findOne({ idNumber });
            
            if (employeeExists){
                res.status(400).send({ error: 'This employee already exists' });
            }
            if (!idNumber || !firstName || !lastName || !phoneNumber || !salary) {
                res.status(400).send({ error: 'Please fill out all the required fields to register your employee' });
            }

            const newEmployee = {
                idNumber: idNumber,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                salary: salary,
                business: business,
                user: req.user._id
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
            const employees = await Employee.find({ user: req.user._id });

            // Send employees to the frontend
            res.status(200).json(employees);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the employees'});
        }
    };

    static async updateEmployee(req, res) {
        try {
            const employee = await Employee.findById(req.params.id);

            if (employee) {
                if (employee.user.toString() === req.user._id.toString()) {
                    const employeeUpdate = await Employee.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true
                    });

                    return res.status(200).json(employeeUpdate);
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to update employee details' });
                }
            } else {
                return res.status(404).json({ message: 'Employee not found'});
            }
        } catch (error) {
            return res.json(500).json({ message: 'A server error occurred while updating the employee details' });
        }
    };

    static async deleteEmployee(req, res) {
        try {
            const employee = await Employee.findById(req.params.id);

            if (employee) {
                if (employee.user.toString() === req.user._id.toString()) {
                    await employee.deleteOne();
                    return res.status(200).json({ message: 'Employee deleted successfully' });
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to delete employee details' });
                }
            } else {
                return res.status(404).json({ message: 'Employee not found'});
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            return res.status(500).json({ message: 'A server error occurred while deleting the employee' });
        }
    };
}

module.exports = EmployeeController;