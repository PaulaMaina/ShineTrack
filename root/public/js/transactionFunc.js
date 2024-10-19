// Retrieves the login token from localStorage
const token = localStorage.getItem('token');

async function showTransactions() {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/transactions/alltransactions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                const tableBody = document.querySelector('#mytransactions tbody');
                let counter = 1;

                tableBody.innerHTML = '';

                data.forEach(transaction => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${counter}</td>
                        <td>${transaction.numberPlate}</td>
                        <td>${transaction.service}</td>
                        <td>${transaction.totalAmount}</td>
                        <td>${transaction.servedBy}</td>
                        <td>${transaction.business}</td>
                        <td>
                            <button id="edit" onclick="editTransaction('${transaction._id}')">Edit</button>
                            <button id="delete" onclick="deleteTransaction('${transaction._id}')">Delete</button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                    counter += 1;
                });
            } else {
                document.getElementById('outputMessage').innerText = 'No transactions found. Create one today!';
            }
        } catch (error) {
            alert('An error occurred while fetching your transactions. Please try again');
            console.error('Error:', error);
        }
    } else {
        alert('The user is not authenticated. Please log in.');
    }
}

//Makes an authenticated request to create a new transaction
if (token) {
    document.getElementById('transaction-register').addEventListener('submit', async function (e) {
        e.preventDefault();

        const business = document.getElementById('bizList-dropdown').value;
        const numberPlate = document.getElementById('numberPlate').value;
        const service = document.getElementById('service').value;
        const totalAmount = document.getElementById('totalAmount').value;
        const paymentStatus = document.getElementById('payment-dropdown').value;
        const pickupStatus = document.getElementById('pickup-dropdown').value;
        const servedBy = document.getElementById('employee-dropdown').value;

        const formData = {
            numberPlate,
            service,
            totalAmount,
            paymentStatus,
            pickupStatus,
            servedBy,
            business
        };

        try {
            const res = await fetch('http://localhost:3000/api/transactions/new-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            //Checks whether the transaction creation was successful
            if (res.ok) {
                document.getElementById('outputMessage').innerText = 'Transaction creation has been completed successfully!';
                
                //Redirects to the transactions page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/transactions';
                }, 3000);
            } else {
                document.getElementById('outputMessage').innerText = data.message;     //Displays the message from the backend
            }
        } catch (error) {
            document.getElementById('outputMessage').innerText = 'An error occurred during creation. Please try again';
            console.error('Error:', error);
        }
    });
}

// Makes an authenticated request to edit details of a specific transaction
async function editTransaction(id) {
    const newPlate = prompt('Enter the car\'s number plate: ');
    const newService = prompt('Enter a new service: ');
    const newAmount = prompt('Enter a new amount: ');

    if (newPlate && newService && newAmount) {
        const transactionUpdate = {
            numberPlate: newPlate,
            service: newService,
            totalAmount: newAmount
        };

        try {
            const res = await fetch(`/api/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transactionUpdate)
            });

            if (res.ok) {
                alert('The transaction details have been updated successfully');
                showTransactions();
            } else {
                const data = await res.json();

                alert('An error occurred: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }
}

// Makes an authenticated request to delete a transaction
async function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        try {
            const res = await fetch(`/api/transactions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert('The transaction selected has been deleted successfully');
                showTransactions();
            } else {
                const data = await res.json();

                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    };
}

// Loads the user's transactions
window.onload = showTransactions;