// Retrieves the login token from localStorage
const token = localStorage.getItem('token');

async function showEmployees() {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/employees/myemployees', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                const tableBody = document.querySelector('#myemployees tbody');
                let counter = 1;

                tableBody.innerHTML = '';

                data.forEach(employee => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${counter}</td>
                        <td>${employee.idNumber}</td>
                        <td>${employee.firstName} ${employee.lastName}</td>
                        <td>${employee.phoneNumber}</td>
                        <td>${employee.salary}</td>
                        <td>
                            <button id="edit" onclick="editEmployee('${employee._id}')">Edit</button>
                            <button id="delete" onclick="deleteEmployee('${employee._id}')">Delete</button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                    counter += 1;
                });
            } else {
                document.getElementById('outputMessage').innerText = 'No employees found. Register one today!';
            }
        } catch (error) {
            alert('An error occurred while fetching your employees. Please try again');
            console.error('Error:', error);
        }
    } else {
        alert('The user is not authenticated. Please log in.');
    }
}

//Makes an authenticated request to register a new employee
if (token) {
    document.getElementById('employee-register').addEventListener('submit', async function (e) {
        e.preventDefault();

        const idNumber = document.getElementById('idNumber').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const salary = document.getElementById('salary').value;
        const business = document.getElementById('bizList-dropdown').value;

        const formData = {
            idNumber,
            firstName,
            lastName,
            phoneNumber,
            salary,
            business
        };

        try {
            const res = await fetch('http://localhost:3000/api/employees/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            //Checks whether the employee registration was successful
            if (res.ok) {
                document.getElementById('outputMessage').innerText = 'Registration has been completed successfully!';
                
                //Redirects to the employees page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/employees';
                }, 2000);
            } else {
                document.getElementById('outputMessage').innerText = data.message;     //Displays the message from the backend
            }
        } catch (error) {
            document.getElementById('outputMessage').innerText = 'An error occurred during registration. Please try again';
            console.error('Error:', error);
        }
    });
}

// Makes an authenticated request to edit details of a specific employee
async function editEmployee(id) {
    const newFirstName = prompt('Enter a new first name: ');
    const newLastName = prompt('Enter a new last name: ');
    const newPhoneNumber = prompt('Enter a new phone number: ');

    if (newFirstName && newLastName && newPhoneNumber) {
        const employeeUpdate = {
            firstName: newFirstName,
            lastName: newLastName,
            phoneNumber: newPhoneNumber
        };

        try {
            const res = await fetch(`/api/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(employeeUpdate)
            });

            if (res.ok) {
                alert('The employee details have been updated successfully');
                showEmployees();
            } else {
                const data = await res.json();

                alert('An error occurred: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }
}

// Makes an authenticated request to delete an employees
async function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        try {
            const res = await fetch(`/api/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert('The employee selected has been deleted successfully');
                showEmployees();
            } else {
                const data = await res.json();

                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    };
}

// Loads the user's employees
window.onload = showEmployees;