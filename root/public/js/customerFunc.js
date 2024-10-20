// Retrieves the login token from localStorage
const token = localStorage.getItem('token');

async function showCustomers() {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/customers/mycustomers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                const customerContainer = document.getElementById('customers');
                
                customerContainer.innerHTML = '';

                data.forEach(customer => {
                    const customerCard = `
                        <div class="customer-card">
                            <div class="customer-icon">
                                <img src="/images/car-image.jpg" alt="Car image">
                            </div>
                            <h3 id="customername">${customer.firstName} ${customer.lastName}</h3>
                            <div class="customer-text">
                                <h4 id="numberPlate">${customer.carPlate}</h4>
                                <p id="phoneNumber">${customer.telephone}</p>
                            </div>
                            <div class="action-button">
                                <button onclick="editCustomer('${customer._id}')" class="edit"><i class="fa fa-pencil"></i></button>
                                <button onclick="deleteCustomer('${customer._id}')" class="delete"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    `;

                    customerContainer.innerHTML += customerCard;
                });
            } else {
                document.getElementById('outputMessage').innerText = 'No customer found. Register one today!';
            }
        } catch (error) {
            alert('An error occurred while fetching your customers. Please try again');
            console.error('Error:', error);
        }
    } else {
        alert('The user is not authenticated. Please log in.');
    }
}

//Makes an authenticated request to register a new customer
if (token) {
    document.getElementById('customerRegister').addEventListener('submit', async function (e) {
        e.preventDefault();

        const carPlate = document.getElementById('carPlate').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const telephone = document.getElementById('telephone').value;
        const carModel = document.getElementById('carModel').value;
        const business = document.getElementById('bizList-dropdown').value;

        const formData = {
            carPlate,
            firstName,
            lastName,
            telephone,
            carModel,
            business
        };

        console.log(formData);

        try {
            const res = await fetch('http://localhost:3000/api/customers/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            //Checks whether the customer registration was successful
            if (res.ok) {
                document.getElementById('outputMessage').innerText = 'Registration has been completed successfully!';
                
                //Redirects to the customers page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/customers';
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

// Makes an authenticated request to edit details of a specific customer
async function editCustomer(id) {
    const newFirstName = prompt('Enter a new first name: ');
    const newLastName = prompt('Enter a new last name: ');
    const newPhoneNumber = prompt('Enter a new phone number: ');

    if (newFirstName && newLastName && newPhoneNumber) {
        const customerUpdate = {
            firstName: newFirstName,
            lastName: newLastName,
            telephone: newPhoneNumber
        };

        try {
            const res = await fetch(`/api/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(customerUpdate)
            });

            if (res.ok) {
                alert('The customer details have been updated successfully');
                showCustomers();
            } else {
                const data = await res.json();

                alert('An error occurred: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }
}

// Makes an authenticated request to delete a customer
async function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        try {
            const res = await fetch(`/api/customers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert('The customer selected has been deleted successfully');
                showCustomers();
            } else {
                const data = await res.json();

                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    };
}

// Loads the user's customers
window.onload = showCustomers;