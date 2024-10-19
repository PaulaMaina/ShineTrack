function showPassword() {
    var pwd = document.getElementById('password');
    var confirmPwd = document.getElementById('confirmpwd');

    if (pwd.type === 'password' || confirmPwd.type === 'password') {
        pwd.type = 'text';
        confirmPwd.type = 'text';
    } else {
        pwd.type = 'password';
        confirmPwd.type = 'password';
    }
}

// Log out function
function logout() {
    localStorage.removeItem('token');       // Deletes the authorization token
    window.location.href = '/login';
}

// Dropdown of businesses in the customer registration form
document.addEventListener('DOMContentLoaded', async () => {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/businesses/mybusinesses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const businesses = await res.json();
            const bizDropdown = document.getElementById('bizList-dropdown');

            businesses.forEach((business) => {
                const option = document.createElement('option');

                option.value = business._id;
                option.textContent = business.bizname;
                bizDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('An error occurred fetching businesses:', error);
        }
    }
});

// Dropdown of employees in the transaction registration form
document.addEventListener('DOMContentLoaded', async () => {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/employees/myemployees', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const employees = await res.json();
            const employeeDropdown = document.getElementById('employee-dropdown');

            employees.forEach((employee) => {
                const option = document.createElement('option');
                const fullName = `${employee.firstName} ${employee.lastName}`;

                option.value = employee._id;
                option.textContent = fullName;
                employeeDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('An error occurred fetching employees:', error);
        }
    }
});