// Retrieves the login token from localStorage
const token = localStorage.getItem('token');

async function showExpenses() {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/expenses/allexpenses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                const tableBody = document.querySelector('#myexpenses tbody');
                let counter = 1;

                tableBody.innerHTML = '';

                data.forEach(expenseRecord => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${counter}</td>
                        <td>${expenseRecord.expense}</td>
                        <td>${expenseRecord.expenseAmount}</td>
                        <td>${expenseRecord.business}</td>
                        <td>
                            <button id="edit" onclick="editExpense('${expenseRecord._id}')">Edit</button>
                            <button id="delete" onclick="deleteExpense('${expenseRecord._id}')">Delete</button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                    counter += 1;
                });
            } else {
                document.getElementById('outputMessage').innerText = 'No expenses found. Create one today!';
            }
        } catch (error) {
            alert('An error occurred while fetching your expenses. Please try again');
            console.error('Error:', error);
        }
    } else {
        alert('The user is not authenticated. Please log in.');
    }
}

//Makes an authenticated request to create a new expense
if (token) {
    document.getElementById('expensesRegister').addEventListener('submit', async function (e) {
        e.preventDefault();

        const business = document.getElementById('bizList-dropdown').value;
        const expense = document.getElementById('expense').value;
        const expenseAmount = document.getElementById('expenseAmount').value;

        const formData = {
            expense,
            expenseAmount,
            business
        };

        try {
            const res = await fetch('http://localhost:3000/api/expenses/new-expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            //Checks whether the expense creation was successful
            if (res.ok) {
                document.getElementById('outputMessage').innerText = 'Expense creation has been completed successfully!';
                
                //Redirects to the expenses page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/expenses';
                }, 2000);
            } else {
                document.getElementById('outputMessage').innerText = data.message;     //Displays the message from the backend
            }
        } catch (error) {
            document.getElementById('outputMessage').innerText = 'An error occurred during creation. Please try again';
            console.error('Error:', error);
        }
    });
}

// Makes an authenticated request to edit details of a specific expense
async function editExpense(id) {
    const newExpense = prompt('Enter a new expense: ');
    const newAmount = prompt('Enter a new amount: ');

    if (newExpense && newAmount) {
        const expenseUpdate = {
            expense: newExpense,
            expenseAmount: newAmount
        };

        try {
            const res = await fetch(`/api/expenses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(expenseUpdate)
            });

            if (res.ok) {
                alert('The expense details have been updated successfully');
                showExpenses();
            } else {
                const data = await res.json();

                alert('An error occurred: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }
}

// Makes an authenticated request to delete an expense
async function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        try {
            const res = await fetch(`/api/expenses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert('The expense selected has been deleted successfully');
                showExpenses();
            } else {
                const data = await res.json();

                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    };
}

// Loads the user's expenses
window.onload = showExpenses;