const token = localStorage.getItem('token');

async function showBusinesses() {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/businesses/mybusinesses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = res.json();

            if (Array.isArray(data)) {
                const tableBody = document.querySelector('#mybusinesses tbody');

                tableBody.innerHTML = '';

                data.forEach(business => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${business.bizname}</td>
                        <td>${business.bizLocation}</td>
                        <td>${business.telNumber}</td>
                        <td>${business.opeingHours}</td>
                        <td>${business.closingHours}</td>
                        <td>${business.bizDescription}</td>
                    `;

                    tableBody.appendChild(row);
                });
            } else {
                document.getElementById('message').innerText = 'No businesses found. Register one today!';
            }
        } catch (error) {
            document.getElementById('message').innerText = 'An error occurred while fetching your businesses. Please try again';
            console.error('Error:', error);
        }
    } else {
        document.getElementById('message').innerText = 'The user is not authenticated. Please log in.' ;
    }
}

window.onload = showBusinesses;