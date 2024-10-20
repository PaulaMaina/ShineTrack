const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', async () => {
    if (token) {
        const resTransactions = await fetch('http://localhost:3000/api/transactions/alltransactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const transactions = await resTransactions.json();
        const washes = transactions.length;

        document.getElementById('washes').innerText = washes;

        // Counts the total number of customers
        const resCustomers = await fetch('http://localhost:3000/api/customers/mycustomers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const customers = await resCustomers.json();
        const totalCustomers = customers.length;

        document.getElementById('customers').innerText = totalCustomers;

        const resEarnings = await fetch('http://localhost:3000/api/transactions/totalEarnings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const earnings = await resEarnings.json();
        if (earnings.totalAmountEarned !== undefined) {
            document.getElementById('earnings').innerText = `Ksh. ${earnings.totalAmountEarned}`;
        } else {
            document.getElementById('earnings').innerText = '0';
        }
    }
});